import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { useTranslation } from "react-i18next";
import {
  NavBarBtnLangs,
  NavBarButton,
  NavBarButtonTheme,
  NavBarContainer,
  NavBarContetns,
  NavBarContetnsUser,
  NavBarLink,
} from "./NavBar.styled";

const Navbar = () => {
  const role = localStorage.getItem("role");

  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { t, i18n } = useTranslation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <NavBarContainer className="navbar">
      <NavBarLink to="/dashboard">🏠 {t("page")}</NavBarLink>

      <NavBarContetnsUser>
        {role === "admin" || role === "superadmin" ? (
          <NavBarLink to="/admin">Admin</NavBarLink>
        ) : null}
        {role === "superadmin" && <NavBarLink to="/superadmin">Superadmin</NavBarLink>}

        {user?.role === "superadmin" && (
          <NavBarLink to="/users">👥 {t("users")}</NavBarLink>
        )}
        {user && (
          <NavBarButton onClick={handleLogout}>🚪{t("logout")}</NavBarButton>
        )}
      </NavBarContetnsUser>

      <NavBarContetns>
        <NavBarButtonTheme onClick={toggleTheme} className="theme-toggle">
          {theme === "light" ? "🌙 Темна" : "☀️ Світла"}
        </NavBarButtonTheme>
        <NavBarBtnLangs>
          <NavBarButton onClick={() => i18n.changeLanguage("uk")}>
            Українська
          </NavBarButton>
          <NavBarButton onClick={() => i18n.changeLanguage("en")}>
            English
          </NavBarButton>
          <NavBarButton onClick={() => i18n.changeLanguage("ru")}>
            Русский
          </NavBarButton>
        </NavBarBtnLangs>
      </NavBarContetns>
      {/* <div class="theme-toggle-wrapper">
        <label class="toggle-switch">
          <input type="checkbox" />
          <span class="slider">
            <div class="clouds">
              <svg viewBox="0 0 100 100" class="cloud cloud1">
                <path d="M30,45 Q35,25 50,25 Q65,25 70,45 Q80,45 85,50 Q90,55 85,60 Q80,65 75,60 Q65,60 60,65 Q55,70 50,65 Q45,70 40,65 Q35,60 25,60 Q20,65 15,60 Q10,55 15,50 Q20,45 30,45"></path>
              </svg>
              <svg viewBox="0 0 100 100" class="cloud cloud2">
                <path d="M30,45 Q35,25 50,25 Q65,25 70,45 Q80,45 85,50 Q90,55 85,60 Q80,65 75,60 Q65,60 60,65 Q55,70 50,65 Q45,70 40,65 Q35,60 25,60 Q20,65 15,60 Q10,55 15,50 Q20,45 30,45"></path>
              </svg>
            </div>
          </span>
        </label>
      </div> */}
    </NavBarContainer>
  );
};

export default Navbar;
