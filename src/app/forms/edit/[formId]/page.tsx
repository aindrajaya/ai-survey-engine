import React from "react";
import { db } from "@/db";
import { forms } from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/auth";

const page = async ({ params }: { params: { formId: string } }) => {
  const formId = params.formId;

  if (!formId) {
    return <div>Form not found</div>;
  }

  const session = await auth();
  const userId = session?.user?.id;
  const form = await db.query.forms.findFirst({
    where: eq(forms.id, parseInt(formId)),
    with: {
      questions: {
        with: {
          fieldOptions: true,
        },
      },
    },
  });

  console.log(form);
  console.log("session: ", session);

  if (userId !== form?.userId) {
    return <div>You are not authorized to view this page</div>;
  }

  return <div>{formId}</div>;
};

export default page;
