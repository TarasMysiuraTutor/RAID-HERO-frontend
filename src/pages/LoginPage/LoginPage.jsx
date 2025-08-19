// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../api/axios";
// import { useAuth } from "../auth/AuthContext";
// import { useTranslation } from "react-i18next";

// const LoginPage = () => {
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const [form, setForm] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");
//   const { t, i18n } = useTranslation();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const res = await API.post("/auth/login", form);
//       login(res.data);
//       navigate("/dashboard");
//     } catch (err) {
//       setError(err.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div className="auth-page">
//       <h2>🔐 {t("login")}</h2>
//       {error && <p className="error">{error}</p>}
//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           name="email"
//           placeholder={t("email")}
//           value={form.email}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder={t("password")}
//           value={form.password}
//           onChange={handleChange}
//           required
//         />
//         <button type="submit">{t("login")}</button>
//       </form>
//     </div>
//   );
// };

// export default LoginPage;

// src/pages/LoginPage.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import {
  FormButtonSubmit,
  FormContainer,
  FormErrorMessage,
  FormForgot,
  FormForgotLink,
  FormForm,
  FormInput,
  FormInputGroup,
  FormInputLabel,
  FormTitle,
  LoginPageContainer,
  SocialIconButton,
  SocialIconsContainer,
  SocialMessage,
  SocialMessageLine,
  SocialMessageLink,
  SocialMessageText,
  SvgSelectorIcon,
} from "./LoginPage.styled";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "", password: ""
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/login", formData);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.username);
      localStorage.setItem("role", res.data.role);
      // Очистити поля
      setFormData({
        email: "",
        password: "",
      });

      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <LoginPageContainer>
      <FormContainer className="form-container">
        <FormTitle className="title">Login</FormTitle>
        <FormForm className="form" onSubmit={handleSubmit}>
          <FormInputGroup className="input-group">
            <FormInputLabel htmlFor="email">Email</FormInputLabel>
            <FormInput
              type="email"
              name="email"
              id="email"
              onChange={handleChange}
              required
            />
          </FormInputGroup>
          <FormInputGroup className="input-group">
            <FormInputLabel htmlFor="password">Password</FormInputLabel>
            <FormInput
              type="password"
              name="password"
              id="password"
              onChange={handleChange}
              required
            />
          </FormInputGroup>
          <FormForgot>
            <FormForgotLink rel="noopener noreferrer" target="_blank" href="#">
              Forgot Password ?
            </FormForgotLink>
          </FormForgot>
          {error && <FormErrorMessage>{error}</FormErrorMessage>}
          <FormButtonSubmit className="sign" type="submit">
            Sign in
          </FormButtonSubmit>
        </FormForm>
        <SocialMessage>
          <SocialMessageLine></SocialMessageLine>
          <SocialMessageText>Login with social accounts</SocialMessageText>
          <SocialMessageLine></SocialMessageLine>
        </SocialMessage>
        <SocialIconsContainer>
          <SocialIconButton
            aria-label="Log in with Google"
            href="http://localhost:5000/api/auth/google"
            rel="noopener noreferrer"
            target="_blank"
          >
            <SvgSelectorIcon id="signGoogle" />
          </SocialIconButton>
          <SocialIconButton
            aria-label="Log in with GitHub"
            href="http://localhost:5000/api/auth/github"
            rel="noopener noreferrer"
            target="_blank"
          >
            <SvgSelectorIcon id="singGitHub" />
          </SocialIconButton>
        </SocialIconsContainer>
        <SocialMessageText>
          Don't have an account?
          <SocialMessageLink rel="noopener noreferrer" target="_blank" href="#">
            <Link to="/register">Sign up</Link>
          </SocialMessageLink>
        </SocialMessageText>
      </FormContainer>
    </LoginPageContainer>
  );
};

export default LoginPage;
