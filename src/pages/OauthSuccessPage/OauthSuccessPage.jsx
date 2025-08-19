// src/pages/OauthSuccessPage.jsx
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const OauthSuccessPage = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = params.get("token");
    const username = params.get("username");
    const role = params.get("role");

    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("username", username);
      localStorage.setItem("role", role);

      // редірект на дашборд або головну
      navigate("/dashboard");
    } else {
      navigate("/auth/login");
    }
  }, [params, navigate]);

  return <p>Logging in via social network...</p>;
};

export default OauthSuccessPage;
