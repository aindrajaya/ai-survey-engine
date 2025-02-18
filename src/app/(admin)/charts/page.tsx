import { getUserForms } from "@/app/actions/getUserForms"
import FormsPicker from "../results/FormsPicker"
import ChartsDisplay from "./ChartsDisplay"

const ChartsPage = async ({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}) => {
  const userForms = await getUserForms()

  if (!userForms?.length) {
    return <div>No forms found</div>
  }

  const selectOptions = userForms.map((form) => ({
    label: form.name,
    value: form.id,
  }))

  const formId = searchParams?.formId ? Number.parseInt(searchParams.formId as string) : userForms[0].id

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Charts</h1>
      <FormsPicker options={selectOptions} />
      <ChartsDisplay formId={formId} />
    </div>
  )
}

export default ChartsPage

