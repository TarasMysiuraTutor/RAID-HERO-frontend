import React from "react";
// import { useAuth } from "../auth/AuthContext";
// import api from "../api/axios";
// import { useTranslation } from "react-i18next";

export default function ErrorPage() {
  // const { user, logout } = useAuth();
  // const { t } = useTranslation();

  // const handleParse = async () => {
  //   try {
  //     const res = await api.post("/heroes/parse");
  //     alert(res.data.message);
  //   } catch (err) {
  //     alert(err.response?.data?.message || "Parsing failed");
  //   }
  // };

  return (
    <>
      <div>
        <div>
          <span className="neon">
            4<span>4</span>
          </span>
          <span className="neon">
            0<span>0</span>
          </span>
          <span className="neon">
            4<span>4</span>
          </span>
        </div>
      </div>
      <div className="base">
        <div className="error"></div>
        <span className="message">Page Not Find</span>
        <br />
        <span className="message">Sorry about This</span>
      </div>
    </>
  );
}
