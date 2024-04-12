"use server";

import { db } from "@/db";
import { formSubmissions, answers as dbAnswers } from "@/db/schema";

interface SubmitAnswersData {
  formId: number;
  answers: {
    questionId: number;
    value?: string | null;
    fieldOptionsId?: number | null;
  }[];
}

export async function submitAnswers(data: SubmitAnswersData) {
  const { formId, answers } = data;

  const newFormSubmissions = await db
    .insert(formSubmissions)
    .values({ formId })
    .returning({ insertedId: formSubmissions.id });

  const [{ insertedId }] = newFormSubmissions;

  await db.transaction(async (tx) => {
    for (const answer of answers) {
      await tx
        .insert(dbAnswers)
        .values({
          formSubmissionId: insertedId,
          ...answer,
        })
        .returning({
          answerId: dbAnswers.id,
        });
    }
  });

  return insertedId;
}
