// import React from "react";
// import { useAuth } from "../auth/AuthContext";

// const DashboardPage = () => {
//   const { user } = useAuth();

//   return (
//     <div className="dashboard">
//       {user && <h2>👋 Вітаємо, {user.username || "користувач"}</h2>}
//       {/* <h2>Вітаємо, {user.username}!</h2> */}
//       <p>Ваша роль: <strong>{user?.role}</strong></p>

//       {user?.role === "superadmin" && <p>🔧 Ви маєте доступ до керування користувачами та запуску парсера.</p>}
//       {user?.role === "admin" && <p>🛠 Ви можете додавати або редагувати героїв.</p>}
//       {user?.role === "user" && <p>📖 Ви можете переглядати та порівнювати героїв.</p>}
//     </div>
//   );
// };

// export default DashboardPage;

import React from "react";
import { useAuth } from "../auth/AuthContext";
import api from "../api/axios";
import { useTranslation } from "react-i18next";

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const { t } = useTranslation();

  const handleParse = async () => {
    try {
      const res = await api.post("/heroes/parse");
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || "Parsing failed");
    }
  };

  return (
    <div>
      <h2>
        👋 {t("welcome")}, {user?.username || t("user")}!
      </h2>
      <p>
        🔐 Ваша роль: <b>{user?.role}</b>
      </p>

      {user?.role === "superadmin" && (
        <button onClick={handleParse}>🚀 {t("runParser")}</button>
      )}

      <button onClick={logout}>Вийти</button>
    </div>
  );
}
