import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/layout/sidebar";
import { Navbar } from "@/components/layout/navbar";
import { ResumenDiarioModal } from "@/components/common/daily-summary-modal";

export function MainLayout() {
  return (
    <div className="min-h-screen bg-background">
      <ResumenDiarioModal />
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-4 md:p-6 lg:p-8 md:ml-64">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
