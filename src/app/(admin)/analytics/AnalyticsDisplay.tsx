import { db } from "@/db"
import { eq } from "drizzle-orm"
import { forms } from "@/db/schema"

type Props = {
  formId: number
}

const AnalyticsDisplay = async ({ formId }: Props) => {
  const form = await db.query.forms.findFirst({
    where: eq(forms.id, formId),
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

  if (!form) return <div>Form not found</div>

  const totalSubmissions = form.submissions.length

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Form: {form.name}</h2>
      <p className="mb-4">Total Submissions: {totalSubmissions}</p>

      {form.questions.map((question) => (
        <div key={question.id} className="mb-6 p-4 border rounded">
          <h3 className="text-lg font-medium mb-2">{question.text}</h3>
          {question.fieldType === "RadioGroup" || question.fieldType === "Select" ? (
            <ul>
              {question.fieldOptions.map((option) => {
                const count = question.answers.filter((a) => a.fieldOptionsId === option.id).length
                const percentage = totalSubmissions > 0 ? ((count / totalSubmissions) * 100).toFixed(2) : 0
                return (
                  <li key={option.id} className="flex justify-between">
                    <span>{option.text}</span>
                    <span>
                      {count} ({percentage}%)
                    </span>
                  </li>
                )
              })}
            </ul>
          ) : (
            <p>Text responses: {question.answers.length}</p>
          )}
        </div>
      ))}
    </div>
  )
}

export default AnalyticsDisplay

