// src/pages/AuthPage.jsx
import { useContext, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext.js";

export default function AuthPage() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { user, logout } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    try {
      if (!isLogin && formData.password !== formData.confirmPassword) {
        setError("Паролі не співпадають");
        return;
      }

      if (isLogin) {
        const res = await API.post("/auth/login", formData);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("username", res.data.username);
        localStorage.setItem("role", res.data.role);
        if (res.data.role === "superadmin") navigate("/superadmin");
        else if (res.data.role === "admin") navigate("/admin");
        else navigate("/user");
      } else {
        await API.post("/auth/register", formData);
        setSuccess(true);
      }
      // console.log("Form Data:", formData);
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "user",
      });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          (isLogin ? "Login failed" : "Registration failed")
      );
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-6">
          {isLogin ? "Вхід" : "Реєстрація"}
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ім'я користувача
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Введіть ім'я"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Роль
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="user">Користувач</option>
                  <option value="admin">Адміністратор</option>
                </select>
                {formData.role === "admin" && (
                  <p className="text-yellow-600 text-sm mt-1">
                    ⚠️ Реєстрація адміністратора буде підтверджена
                    суперадміністратором
                  </p>
                )}
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Пароль
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                placeholder="********"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Підтвердіть пароль
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="********"
              />
            </div>
          )}

          {isLogin && (
            <div className="text-right">
              <a
                href="/forgot-password"
                className="text-blue-500 text-sm hover:underline"
              >
                Забули пароль?
              </a>
            </div>
          )}

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && (
            <p className="text-green-500 text-sm">✅ Реєстрація успішна</p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-lg py-2 font-semibold transition"
          >
            {isLogin ? "Увійти" : "Зареєструватися"}
          </button>
        </form>
        <div className="my-4 flex items-center">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-500 text-sm">або</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <div className="space-y-2">
          <a
            href="http://localhost:5000/api/auth/google"
            rel="noopener noreferrer"
            className="block w-full text-center bg-red-500 hover:bg-red-600 text-white rounded-lg py-2 font-semibold transition"
          >
            Увійти через Google
          </a>
          <a
            href="http://localhost:5000/api/auth/github"
            rel="noopener noreferrer"
            className="block w-full text-center bg-gray-800 hover:bg-gray-900 text-white rounded-lg py-2 font-semibold transition"
          >
            Увійти через GitHub
          </a>
        </div>

        <p className="text-sm text-center mt-4 text-gray-600">
          {isLogin ? "Не маєте акаунта?" : "Вже є акаунт?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-500 hover:underline"
          >
            {isLogin ? "Зареєструйтесь" : "Увійдіть"}
          </button>
        </p>
      </div>
    </div>
  );
}
