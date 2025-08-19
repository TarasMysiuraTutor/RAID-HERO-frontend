// src/components/NavBar/Navbar.jsx
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Bars3Icon,
  XMarkIcon,
  SunIcon,
  MoonIcon,
} from "@heroicons/react/24/outline";
import { AuthContext } from "../../auth/AuthContext.js";
import { useLanguage } from "../../context/LanguageContext.js";
import { useTheme } from "../../context/ThemeContext.js";

export default function Navbar() {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  const { user, logout } = useContext(AuthContext);
  // console.log("User in Navbar:", user);
  // const { user, logout } = AuthContext();

  // const changeLanguage = (lng) => {
  //   i18n.changeLanguage(lng);
  // };
  const { changeLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="bg-gray-800 dark:bg-gray-900 text-white dark:text-gray-200 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-lg font-bold">
            RAID HERO
          </Link>

          <div className="hidden md:flex gap-4">
            <Link to="/heroes" className="hover:text-gray-300">
              {t("heroes")}
            </Link>
            {user?.role === "admin" && (
              <Link to="/admin" className="hover:text-gray-300">
                {t("admin")}
              </Link>
            )}
            {user?.role === "superadmin" && (
              <Link to="/superadmin" className="hover:text-gray-300">
                {t("superadmin")}
              </Link>
            )}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 bg-gray-700 dark:bg-gray-600 rounded"
            >
              {theme === "dark" ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
            </button>

            <select
              onChange={(e) => changeLanguage(e.target.value)}
              className="bg-gray-700 dark:bg-gray-600 text-white rounded px-2 py-1"
            >
              <option value="uk">UA</option>
              <option value="en">EN</option>
              <option value="ru">RU</option>
            </select>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="bg-gray-700 dark:bg-gray-600 px-3 py-1 rounded"
                >
                  {user.username}
                </button>
                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 text-black dark:text-white rounded shadow-lg">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                      {t("profile")}
                    </Link>
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                      {t("logout")}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/auth" className="bg-blue-500 px-3 py-1 rounded">
                {t("login")}
              </Link>
            )}
          </div>

          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-gray-700 dark:bg-gray-800 px-4 py-3 space-y-2">
          <Link to="/heroes" className="block">
            {t("heroes")}
          </Link>
          {user?.role === "admin" && (
            <Link to="/admin" className="block">
              {t("admin")}
            </Link>
          )}
          {user?.role === "superadmin" && (
            <Link to="/superadmin" className="block">
              {t("superadmin")}
            </Link>
          )}
          {/* Перемикач теми */}

          <button onClick={toggleTheme} className="flex items-center gap-2">
            {theme === "light" ? "🌞" : "🌙"} {t("theme")}
          </button>
          {/* Перемикач мови */}

          <select
            onChange={(e) => changeLanguage(e.target.value)}
            className="bg-gray-600 dark:bg-gray-700 text-white rounded px-2 py-1"
          >
            <option value="uk">UA</option>
            <option value="en">EN</option>
            <option value="ru">Ru</option>
          </select>
          <div>
            {user ? (
              <div className="flex items-center gap-4">
                <span>Привіт, {user.username}</span>
                <Link to="/profile" className="block">
                  {t("profile")}
                </Link>
                <button
                  onClick={logout}
                  className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
                >
                  {t("logout")}
                </button>
              </div>
            ) : (
              <Link
                to="/api/auth"
                className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-600"
              >
                {t("login")}
              </Link>
            )}
          </div>

          {/* {user ? (
            <>
              <Link to="/profile" className="block">
                {t("profile")}
              </Link>
              <button onClick={logout} className="block w-full text-left">
                {t("logout")}
              </button>
            </>
          ) : (
            <Link to="/api/auth" className="block bg-blue-500 px-3 py-1 rounded">
              {t("login")}
            </Link>
          )} */}
        </div>
      )}
    </nav>
  );
}

// import { useLanguage } from "../../context/LanguageContext";
// import { useTheme } from "../../context/ThemeContext";
// import { Link } from "react-router-dom";

// export default function Navbar() {
//   const { language, changeLanguage } = useLanguage();
//   const { theme, toggleTheme } = useTheme();

//   return (
//     <nav className="flex justify-between items-center p-4 bg-gray-200 dark:bg-gray-900 shadow">
//       <Link to="/" className="font-bold text-xl dark:text-white">
//         Heroes
//       </Link>

//       {/* Перемикач мови */}
//       <div className="flex gap-2">
//         {["ua", "en", "ru"].map((l) => (
//           <button
//             key={l}
//             onClick={() => changeLanguage(l)}
//             className={`px-3 py-1 rounded transition ${
//               language === l
//                 ? "bg-blue-500 text-white"
//                 : "bg-gray-300 dark:bg-gray-700"
//             }`}
//           >
//             {l.toUpperCase()}
//           </button>
//         ))}
//       </div>

//       {/* Перемикач теми */}
//       <button
//         onClick={toggleTheme}
//         className="px-3 py-1 rounded bg-gray-300 dark:bg-gray-700 dark:text-white"
//       >
//         {theme === "light" ? "🌞" : "🌙"}
//       </button>
//     </nav>
//   );
// }
