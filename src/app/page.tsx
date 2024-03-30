import { Button } from "@/components/ui/button";
import SurveyGenerator from "./survey-generator";
import Header from "@/components/ui/header";
import { SessionProvider } from "next-auth/react";

export default function Home() {
  return (
    <SessionProvider>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <SurveyGenerator />
      </main>
    </SessionProvider>
  );
}
