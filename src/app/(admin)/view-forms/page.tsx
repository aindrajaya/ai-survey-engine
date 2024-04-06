import React from "react";
import FormsList from "@/app/forms/FormsList";
import { getUserForms } from "@/app/actions/getUserForms";
import { InferSelectModel } from "drizzle-orm";
import { forms as dbForms } from "@/db/schema";

type Props = {};

const page = async (props: Props) => {
  const forms: InferSelectModel<typeof dbForms>[] = await getUserForms();

  return (
    <>
      <h1 className="text-3xl bold font-bold px-4 m-5">My Forms</h1>
      <FormsList forms={forms} />
    </>
  );
};

export default page;
