import { Routes, Route } from "react-router-dom";
import { MainLayout } from "./layouts/main-layout";
import { DashboardPage } from "./pages/dashboard-page";
import { ReservasPage } from "./pages/reservas/reservations-page";
import { ClientesPage } from "./pages/clientes/clients-page";
import { CabanasPage } from "./pages/cabanas/cabins-page";
import { TarifasPage } from "./pages/tarifas/rates-page";
import { CalendarioPage } from "./pages/calendario/calendar-page";
import { ReportesPage } from "./pages/reportes/reports-page";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="reservas" element={<ReservasPage />} />
        <Route path="clientes" element={<ClientesPage />} />
        <Route path="cabanas" element={<CabanasPage />} />
        <Route path="tarifas" element={<TarifasPage />} />
        <Route path="calendario" element={<CalendarioPage />} />
        <Route path="reportes" element={<ReportesPage />} />
      </Route>
    </Routes>
  );
}

export default App;
