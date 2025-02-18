import { NextResponse } from "next/server"
import { db } from "@/db"
import { eq } from "drizzle-orm"
import { forms } from "@/db/schema"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const formId = searchParams.get("formId")

  if (!formId) {
    return NextResponse.json({ error: "Form ID is required" }, { status: 400 })
  }

  const form = await db.query.forms.findFirst({
    where: eq(forms.id, Number.parseInt(formId)),
    with: {
      questions: {
        with: {
          fieldOptions: true,
          answers: true,
        },
      },
      submissions: true,
    },
  })

  if (!form) {
    return NextResponse.json({ error: "Form not found" }, { status: 404 })
  }

  const formData = {
    ...form,
    questions: form.questions.map((question) => ({
      ...question,
      fieldOptions: question.fieldOptions.map((option) => ({
        ...option,
        count: question.answers.filter((a) => a.fieldOptionsId === option.id).length,
      })),
    })),
  }

  return NextResponse.json(formData)
}

