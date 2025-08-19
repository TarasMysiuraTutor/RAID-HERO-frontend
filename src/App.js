import React from "react";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import Navbar from "./components/NavBar/Navbar";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import UsersPage from "./pages/UsersPage.jsx";
import HeroComparePage from "./pages/HeroComparePage";
import ErrorPage from "./pages/ErrorPage.jsx";
import RoleBasedRoute from "./components/RoleBasedRoute";
import Unauthorized from "./pages/Unauthorized";
import AdminPage from "./pages/AdminPage.jsx";
import SuperAdminPage from "./pages/SuperAdminPage.jsx";
import OauthSuccessPage from "./pages/OauthSuccessPage.jsx";
import AdminApprovals from "./pages/AdminApprovals.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import HeroList from "./pages/Hero/HeroList.jsx";
import HeroDetails from "./pages/Hero/HeroDetails.jsx";
import { ThemeProvider } from "./context/ThemeContext.js";
import { LanguageProvider } from "./context/LanguageContext.js"; // Додано імпорт LanguageProvider

const App = () => {
  const [user, setUser] = useState({ username: "Taras", role: "superadmin" });
  const [theme, setTheme] = useState("dark");
  const [lang] = useState("en");

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  // Функція для виходу з системи
  const logout = () => {
    setUser(null);
  };
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Navbar user={user} onLogout={logout} toggleTheme={toggleTheme} />

        <Routes>
          <Route path="/heroes" element={<HeroList lang={lang} />} />
          <Route path="/hero/:id" element={<HeroDetails lang={lang} />} />

          {/* Public */}
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/superadmin/approvals" element={<AdminApprovals />} />

          <Route path="/superadmin" element={<SuperAdminPage />} />

          <Route path="/unauthorized" element={<Unauthorized />} />

          <Route path="*" element={<ErrorPage />} />

          <Route path="/compare" element={<HeroComparePage />} />
          <Route path="/oauth-success" element={<OauthSuccessPage />} />
          {/* Protected for all logged-in users */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <UsersPage />
              </ProtectedRoute>
            }
          />
          {/* Admin only */}
          <Route
            element={<RoleBasedRoute allowedRoles={["admin", "superadmin"]} />}
          >
            <Route path="/admin" element={<AdminPage />} />
          </Route>
          {/* Superadmin only */}
          <Route element={<RoleBasedRoute allowedRoles={["superadmin"]} />}>
            <Route path="/superadmin" element={<SuperAdminPage />} />
          </Route>
          {/* Інші маршрути додамо пізніше */}
        </Routes>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
