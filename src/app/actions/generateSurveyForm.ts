"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { saveForm } from "./mutateForm";

export async function generateSurveyForm(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  console.log("Starting form generation..."); // Log start

  const schema = z.object({
    description: z.string().min(1),
  });

  const parse = schema.safeParse({
    description: formData.get("description"),
  });

  if (!parse.success) {
    console.log(parse.error);
    console.error("Parse error:", parse.error); // Log parse error
    return {
      message: "Failed to parse data",
    };
  }

  if (!process.env.OPENAI_API_KEY) {
    console.error("API key not found"); // Log API key error
    return {
      message: "API key not found",
    };
  }

  const data = parse.data;
  const promptExplanation =
    "Based on the description, generate a survey object with 3 fields: name(string) for the form, description(string) of the form and a questions array where every element has 2 fields: text and the fieldType and fieldType can be of these options RadioGroup, Select, Input, Textarea, Switch; and return it in json format. For RadioGroup, and Select types also return fieldOptions array with text and value fields. For example, for RadioGroup, and Select types, the field options array can be [{text: 'Yes', value: 'yes'}, {text: 'No', value: 'no'}] and for Input, Textarea, and Switch types, the field options array can be empty. For example, for Input, Textarea, and Switch types, the field options array can be []";

  try {
    console.log("Sending request to OpenAI API..."); // Log API call start
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY} || "sk-1234567890"`,
      },
      method: "POST",
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `${data.description} ${promptExplanation}`,
          },
        ],
      }),
    });

    if (!response.ok) { // Check for HTTP errors
      const errorData = await response.json();
      console.error("OpenAI API error:", response.status, errorData);
      return { message: "Failed to generate survey form (API error)" };
    }

    const json = await response.json();
    console.log("OpenAI API response:", json); // Log API response

    // Check if choices and message content exist
    if (!json.choices || !json.choices[0].message || !json.choices[0].message.content) {
      console.error("Unexpected OpenAI API response format:", json);
      return { message: "Failed to generate survey form (Invalid API response)" };
    }

    const responseObj = JSON.parse(json.choices[0].message.content);
    console.log("Parsed response object:", responseObj); // Log parsed object

    console.log("Saving form to database..."); // Log database call start
    const dbFormId = await saveForm({
      name: responseObj.name,
      description: responseObj.description,
      questions: JSON.parse(json.choices[0].message.content).questions,
    });
    console.log("Form saved to database with ID:", dbFormId); // Log success


    revalidatePath("/");

    return {
      message: "success",
      data: { formId: dbFormId },
    };
  } catch (error) {
    return {
      message: "Failed to generate survey form",
    };
  }
}
