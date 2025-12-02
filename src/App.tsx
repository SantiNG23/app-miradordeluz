import { Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from "./layouts/main-layout";
import { DashboardPage } from "./pages/dashboard-page";
import { DesignSystemPage } from "./pages/design-system-page";
import { ReservasPage } from "./pages/reservas/reservations-page";
import { ClientesPage } from "./pages/clientes/clients-page";
import { CabanasPage } from "./pages/cabanas/cabins-page";
import { TarifasPage } from "./pages/tarifas/rates-page";
import { CalendarioPage } from "./pages/calendario/calendar-page";
import { ReportesPage } from "./pages/reportes/reports-page";
import LoginView from "./components/common/login-view";
import { useState, useEffect } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });

  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn.toString());
  }, [isLoggedIn]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
  };

  return (
    <Routes>
      <Route
        path="/login"
        element={
          isLoggedIn ? (
            <Navigate to="/" replace />
          ) : (
            <LoginView onLogin={handleLogin} />
          )
        }
      />
      <Route
        path="/"
        element={
          isLoggedIn ? (
            <MainLayout onLogout={handleLogout} />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="design-system" element={<DesignSystemPage />} />
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
