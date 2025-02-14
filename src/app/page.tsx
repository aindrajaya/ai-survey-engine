import { SessionProvider } from "next-auth/react";
import Header from "@/components/ui/header";
import LandingPage from "./landing-page";

export default function Home() {
  return (
    <SessionProvider>
    <div>
      <Header />
      <main className="flex min-h-screen flex-col items-center">
        <LandingPage />
      </main>
    </div>
    </SessionProvider>
  );
}
