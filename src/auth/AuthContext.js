import { createContext, useState, useEffect, useContext } from "react";
import axios from "../api/axios.js"; // Заміни на свій шлях до axios

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Перевіряємо токен при старті
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const res = await axios.get("/auth/me", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(res.data);
        }
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

const login = async (credentials) => {
  const res = await axios.post("/auth/login", credentials);
  localStorage.setItem("token", res.data.token);
  localStorage.setItem("user", JSON.stringify(res.data.user)); // ✅
  setUser(res.data.user);
  };
  
 const register = async (data) => {
   const res = await axios.post("/auth/register", data);
   localStorage.setItem("token", res.data.token);
   localStorage.setItem("user", JSON.stringify(res.data.user)); // ✅
   setUser(res.data.user);
 };

 const logout = () => {
   localStorage.removeItem("token");
   localStorage.removeItem("user"); // ✅
   setUser(null);
 };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
// ✅ власний хук для зручності використання контексту
export const useAuth = () => {
  return useContext(AuthContext);
};
