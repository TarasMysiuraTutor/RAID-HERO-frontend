// src/pages/RegisterPage.jsx
import { useState } from "react";
import API from "../../api/axios";
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
  FormInputSelect,
  FormInputSelectOption,
  FormRoleMessage,
  // FormSelectGroup,
  FormSelectLabel,
  FormSelectTitle,
  FormSuccsesMessage,
  FormTitle,
  RegisterPageContainer,
  SocialIconButton,
  SocialIconsContainer,
  SocialMessage,
  SocialMessageLine,
  SocialMessageLink,
  SocialMessageText,
  SvgSelectorIcon,
} from "./RegisterPage.styled";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", formData);
      setSuccess(true);
      // Очистити поля
      setFormData({
        username: "",
        email: "",
        password: "",
        role: "user",
      });
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <RegisterPageContainer>
      <FormContainer>
        <FormTitle>Register</FormTitle>
        <FormForm onSubmit={handleSubmit}>
          <FormInputGroup className="input-group">
            <FormInputLabel htmlFor="username">Username</FormInputLabel>
            <FormInput
              type="text"
              name="username"
              id="username"
              autoComplete="given-name"
              onChange={handleChange}
              required
            />
          </FormInputGroup>
          <FormInputGroup className="input-group">
            <FormInputLabel htmlFor="email">Email</FormInputLabel>
            <FormInput
              type="email"
              name="email"
              id="email"
              autoComplete="off"
              onChange={handleChange}
              required
            />
          </FormInputGroup>
          <FormInputGroup>
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
          {/* <FormSelectGroup> */}
          <FormSelectLabel htmlFor="role">
            <FormSelectTitle>Role</FormSelectTitle>
            <FormInputSelect name="role" id="role" onChange={handleChange}>
              <FormInputSelectOption defaultValue value="user">
                User
              </FormInputSelectOption>
              <FormInputSelectOption value="admin">Admin</FormInputSelectOption>
            </FormInputSelect>
          </FormSelectLabel>{" "}
          {/* </FormSelectGroup> */}
          {formData.role === "admin" && (
            <FormRoleMessage>
              ⚠️ Admin registration sent for approval
            </FormRoleMessage>
          )}
          {error && <FormErrorMessage>{error}</FormErrorMessage>}
          {success && (
            <FormSuccsesMessage>✅ Registration successful</FormSuccsesMessage>
          )}
          <FormButtonSubmit type="submit">Sign up</FormButtonSubmit>
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
            Sign up
          </SocialMessageLink>
        </SocialMessageText>
      </FormContainer>
    </RegisterPageContainer>
  );
};

export default RegisterPage;
