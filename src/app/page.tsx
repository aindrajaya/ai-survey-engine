import { Button } from "@/components/ui/button";
import SurveyGenerator from "./survey-generator";
import Header from "@/components/ui/header";
import { SessionProvider } from "next-auth/react";
import { db } from "@/db";
import { forms } from "@/db/schema";
import FormsList from "./forms/FormsList";

export default async function Home() {
  const forms = await db.query.forms.findMany();

  return (
    <SessionProvider>
      <Header />
      <main className="flex min-h-screen flex-col items-center p-24">
        <SurveyGenerator />
        <FormsList forms={forms} />
      </main>
    </SessionProvider>
  );
}
