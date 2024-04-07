"use server";

import { db } from "@/db";
import { formSubmissions, answers as dbAnswers } from "@/db/schema";

interface SubmitAnswersData {
  formId: number;
  answers: {
    questionId: number;
    value?: string;
    fieldOptionsId?: number;
  };
}

export async function submitAnswers(data: SubmitAnswersData) {
  const { formId, answers } = data;

  const newFormSubmissions = await db
    .insert(formSubmissions)
    .values({ formId })
    .returning({ insertedId: formSubmissions.id });

  const [{ insertedId }] = newFormSubmissions;
}
