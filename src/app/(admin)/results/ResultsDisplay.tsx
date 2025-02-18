import { Table } from "./Table"
import { db } from "@/db"
import { eq } from "drizzle-orm"
import { forms } from "@/db/schema"

type Props = {
  formId: number
}

const ResultsDisplay = async ({ formId }: Props) => {
  const form = await db.query.forms.findFirst({
    where: eq(forms.id, formId),
    with: {
      questions: {
        with: {
          fieldOptions: true,
        },
      },
      submissions: {
        with: {
          answers: {
            with: {
              fieldOption: true,
            },
          },
        },
      },
    },
  })

  if (!form) return <div>Form not found</div>
  if (!form.submissions || form.submissions.length === 0) return <p>No submissions on this form yet!</p>

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Results for: {form.name}</h2>
      <Table data={form.submissions} columns={form.questions} />
    </div>
  )
}

export default ResultsDisplay

