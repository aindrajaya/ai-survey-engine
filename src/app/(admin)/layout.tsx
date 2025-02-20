import Header from "@/components/ui/header";
import DashboardNav from "@/components/navigation/DashboardNav";
import { SessionProvider } from "next-auth/react";
import SurveyGenerator from "../survey-generator";
import { SidebarNavItem } from "@/types/nav-types";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dashboardConfig: { sidebarNav: SidebarNavItem[] } = {
    sidebarNav: [
      {
        title: "My Forms",
        href: "/view-forms",
        icon: "library",
        disabled: false,
      },
      {
        title: "Results",
        href: "/results",
        icon: "list",
        disabled: false,
      },
      {
        title: "Analytics",
        href: "/analytics",
        icon: "lineChart",
        disabled: false,
      },
      {
        title: "Charts",
        href: "/charts",
        icon: "pieChart",
        disabled: false,
      },
      {
        title: "Settings",
        href: "/settings",
        icon: "settings",
        disabled: true,
      },
    ],
  };

  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <Header />
      <div className="container grid gap-12 md:grid-cols-[200px_1fr] flex-1">
        <aside className="hidden w-[200px] flex-col md:flex pr-2 border-r justify-between">
          <DashboardNav items={dashboardConfig.sidebarNav} />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          <header className="flex items-center">
            <h1 className="text-4xl m-5 p-4 font-semibold">Dashboard</h1>
            <SessionProvider>
              <SurveyGenerator />
            </SessionProvider>
          </header>
          <hr />
          {children}
        </main>
      </div>
    </div>
  );
}
