import { getUserForms } from "@/app/actions/getUserForms"
import type { InferSelectModel } from "drizzle-orm"
import type { forms } from "@/db/schema"
import FormsPicker from "./FormsPicker"
import ResultsDisplay from "./ResultsDisplay"

type Props = {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

const ResultsPage = async ({ searchParams }: Props) => {
  const userForms: InferSelectModel<typeof forms>[] = await getUserForms()

  if (!userForms?.length || userForms.length === 0) {
    return <div>No forms found</div>
  }

  const selectOptions = userForms.map((form) => ({
    label: form.name,
    value: form.id,
  }))

  const formId = searchParams?.formId ? Number.parseInt(searchParams.formId as string) : userForms[0].id

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Results</h1>
      <FormsPicker options={selectOptions} />
      <ResultsDisplay formId={formId} />
    </div>
  )
}

export default ResultsPage

