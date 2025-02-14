"use server";
import { db } from "@/db";
import { forms, questions as dbQuestions, fieldOptions } from "@/db/schema";
import { auth } from "@/auth";
import { InferInsertModel, eq } from "drizzle-orm";

type Form = InferInsertModel<typeof forms>;
type Question = InferInsertModel<typeof dbQuestions>;
type FieldOption = InferInsertModel<typeof fieldOptions>;

interface SaveFormData extends Form {
  questions: Array<Question & { fieldOptions?: FieldOption[] }>;
}

export async function saveForm(data: SaveFormData) {
  const { name, description, questions } = data;

  console.log("Starting to save form data:", name, description, questions); // Log form data

  // console.log("Starting to save form:", name, description); // Log form data

  const session = await auth();
  const userID = session?.user?.id
  // const userID = "Relyon121"

  console.log("User ID:", userID); // Log user ID

  try {
    const newForm = await db
    .insert(forms)
    .values({
      name,
      description,
      userId: userID,
      published: false,
    })
    .returning({ insertedId: forms.id });

    console.log("New form inserted:", newForm); // Log inserted form data
    const formId = newForm[0].insertedId;

    const newQuestions = data.questions.map((question) => {
      return {
        text: question.text,
        fieldType: question.fieldType,
        fieldOptions: question.fieldOptions,
        formId,
      };
    });

    console.log("New questions prepared:", newQuestions); // Log prepared questions

    // await db.transaction(async (tx) => {
    //   console.log("Starting transaction"); // Log transaction start
    //   for (const question of newQuestions) {
    //     const [{ questionId }] = await tx
    //       .insert(dbQuestions)
    //       .values(question)
    //       .returning({ questionId: dbQuestions.id });

    //       console.log("Question inserted:", question, "ID:", questionId); // Log inserted question


    //     if (question.fieldOptions && question.fieldOptions.length > 0) {
    //       console.log("Inserting field options:", question.fieldOptions); // Log field options

    //       await tx.insert(fieldOptions).values(
    //         question.fieldOptions.map((fieldOption) => ({
    //           ...fieldOption,
    //           questionId,
    //         }))
    //       );

    //       console.log("Field options inserted");
    //     }
    //   } 
    // });

    await db.transaction(async (tx) => {
      console.log("Starting transaction"); // Log transaction start

      for (const question of newQuestions) {
          try {
              const [{ questionId }] = await tx
                  .insert(dbQuestions)
                  .values(question)
                  .returning({ questionId: dbQuestions.id });

              console.log("Question inserted:", question, "ID:", questionId); // Log inserted question

              if (question.fieldOptions && question.fieldOptions.length > 0) {
                  console.log("Inserting field options:", question.fieldOptions); // Log field options

                  await tx.insert(fieldOptions).values(
                      question.fieldOptions.map((fieldOption) => ({
                          ...fieldOption,
                          questionId,
                      }))
                  );
                  console.log("Field options inserted"); // Log field options inserted
              }
          } catch (questionError) {
              console.error("Error inserting question or field options:", questionError);
              throw questionError; // Re-throw the error to rollback the transaction
          }
      }
      console.log("Transaction completed successfully"); // Log transaction success
    });

    console.log("Form saved successfully, formId:", formId); 
    return formId;
  } catch (error) {
    console.error("Error saving form:", error); // Log error
    throw error; // Re-throw the error
  }
  
}

export async function publishForm(formId: number) {
  await db.update(forms).set({ published: true }).where(eq(forms.id, formId));
}
