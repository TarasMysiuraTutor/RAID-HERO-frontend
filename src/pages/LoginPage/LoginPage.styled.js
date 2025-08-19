// RegisterPage;
import styled from "styled-components";
import { SvgSelector } from "../../components/Icons/SvgSelector";
export const LoginPageContainer = styled.div`
  padding: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FormContainer = styled.div`
  position: relative;
  width: 360px;
  border-radius: 0.75rem;
  background-color: rgba(17, 24, 39, 1);
  padding: 20px;
  color: rgba(243, 244, 246, 1);
`;

export const FormTitle = styled.h2`
  text-align: center;
  font-size: 1.5rem;
  line-height: 2rem;
  font-weight: 700;
`;

export const FormForm = styled.form`
  margin-top: 32px;
`;
export const FormInputGroup = styled.div`
  width: 100%;
  margin-top: 16px;
  font-size: 0.875rem;
  line-height: 1.25rem;
`;
export const FormInputLabel = styled.label`
  display: block;
  color: rgba(156, 163, 175, 1);
  margin-bottom: 8px;
`;

export const FormInput = styled.input`
  box-sizing: border-box;
  width: 100%;
  border-radius: 8px;
  border: 1px solid rgba(55, 65, 81, 1);
  outline: 0;
  background-color: rgba(17, 24, 39, 1);
  padding: 12px 12px;
  color: rgba(243, 244, 246, 1);
  &:focus,
  &:hover {
    border-color: rgba(167, 139, 250);
  }
`;

export const FormButtonSubmit = styled.button`
  display: block;
  width: 100%;
  background-color: rgba(167, 139, 250, 1);
  padding: 0.75rem;
  text-align: center;
  color: rgba(17, 24, 39, 1);
  border: none;
  border-radius: 0.375rem;
  font-weight: 600;
  margin-top: 16px;
  cursor: pointer;
`;
export const FormForgot = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 0.75rem;
  line-height: 1rem;
  color: rgba(156, 163, 175, 1);
  margin: 8px 0 14px 0;
`;

export const FormForgotLink = styled.a`
  color: rgba(243, 244, 246, 1);
  text-decoration: none;
  font-size: 14px;
  &:hover,
  &:focus {
    text-decoration: underline rgba(167, 139, 250, 1);
  }
`;

export const FormFSingupLink = styled.a`
  color: rgba(243, 244, 246, 1);
  text-decoration: none;
  font-size: 14px;
  &:hover,
  &:focus {
    text-decoration: underline rgba(167, 139, 250, 1);
  }
`;
export const FormRoleMessage = styled.p`
  margin: 0;
  color: "orange";
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const FormErrorMessage = styled.p`
  margin: 0;
  color: "red";
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const FormSuccsesMessage = styled.p`
  margin: 0;
  color: "green";
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const FormSelectGroup = styled.option``;

export const FormSelectLabel = styled.label`
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  // &:after {
  //   content: "<>";
  //   font: 11px "Consolas", monospace;
  //   color: #666;
  //   -webkit-transform: rotate(90deg);
  //   -moz-transform: rotate(90deg);
  //   -ms-transform: rotate(90deg);
  //   transform: rotate(90deg);
  //   right: 8px;
  //   top: 2px;
  //   padding: 0 0 2px;
  //   border-bottom: 1px solid #ddd;
  //   position: absolute;
  //   pointer-events: none;
  // }
  // &:before {
  //   content: "";
  //   right: 6px;
  //   top: 0px;
  //   width: 20px;
  //   height: 20px;
  //   background: #eee;
  //   position: absolute;
  //   pointer-events: none;
  //   display: block;
  // }
`;
export const FormSelectTitle = styled.span`
  display: inline-block;
`;

export const FormInputSelect = styled.select`
  width: 140px;
  // height: 35px;
  padding: 6px;
  border-radius: 4px;
  // box-shadow: 2px 2px 8px #999;
  background: #2c3a4dff;
  color: #fff;
  border: none;
  outline: none;
  display: inline-block;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  cursor: pointer;
`;

export const FormInputSelectOption = styled.option``;

export const SocialMessage = styled.div`
  display: flex;
  align-items: center;
  padding-top: 8px;
`;

export const SocialMessageLine = styled.div`
  height: 1px;
  flex: 1 1 0%;
  background-color: rgba(55, 65, 81, 1);
`;

export const SocialMessageText = styled.p`
  padding-left: 12px;
  padding-right: 12px;
  font-size: 16px;
  line-height: 120%;
  color: rgba(156, 163, 175, 1);
`;

export const SocialIconsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  // position: relative;

  // .socIcon {
  //
  // }
`;

export const SocialIconButton = styled.a`
  border-radius: 4px;
  padding: 4px;
  border: none;
  background-color: transparent;
`;

export const SvgSelectorIcon = styled(SvgSelector)``;
export const SocialMessageLink = styled.a`
  text-align: center;
  font-size: 20px;
  line-height: 16px;
  color: rgba(156, 163, 175, 1);
  margin-left: 8px;
`;
