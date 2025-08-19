import React, { useEffect, useState } from "react";
import axios from "../api/axios";

export default function SuperAdminPage() {
  const [users, setUsers] = useState([]);
  const [heroes, setHeroes] = useState([]);
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    role: "user",
    password: "",
  });
  const [newHero, setNewHero] = useState({
    name: "",
    img: "",
    url: "",
    class: "",
    name_url: "",
  });
  const [loading, setLoading] = useState(false);
  const [parserStatus, setParserStatus] = useState(null);

  // ====== API USERS ======
  const fetchUsers = async () => {
    try {
      const res = await axios.get("/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Помилка завантаження користувачів:", err);
    }
  };

  const handleAddUser = async () => {
    try {
      await axios.post("/users", newUser);
      setNewUser({ username: "", email: "", role: "user", password: "" });
      fetchUsers();
    } catch (err) {
      console.error("Помилка додавання користувача:", err);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`/users/${id}`);
      fetchUsers();
    } catch (err) {
      console.error("Помилка видалення користувача:", err);
    }
  };

  // ====== API HEROES ======
  const fetchHeroes = async () => {
    try {
      const res = await axios.get("/heroes");
      setHeroes(res.data);
    } catch (err) {
      console.error("Помилка завантаження героїв:", err);
    }
  };

  const handleAddHero = async () => {
    try {
      await axios.post("/heroes", newHero);
      setNewHero({ name: "", img: "", url: "", class: "", name_url: "" });
      fetchHeroes();
    } catch (err) {
      console.error("Помилка додавання героя:", err);
    }
  };

  const handleDeleteHero = async (id) => {
    try {
      await axios.delete(`/heroes/${id}`);
      fetchHeroes();
    } catch (err) {
      console.error("Помилка видалення героя:", err);
    }
  };

  // ====== PARSER ======
  const runParser = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/parser/run");
      setParserStatus(res.data.message || "Парсер запущено успішно!");
      fetchHeroes();
    } catch (err) {
      setParserStatus("Помилка запуску парсера");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ====== INIT ======
  useEffect(() => {
    fetchUsers();
    fetchHeroes();
  }, []);

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">
      <h1 className="text-2xl font-bold mb-4">Super Admin Panel</h1>

      {/* ====== Кнопка запуску парсера ====== */}
      <div className="mb-6">
        <button
          onClick={runParser}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow"
          disabled={loading}
        >
          {loading ? "Запуск..." : "Запустити парсер"}
        </button>
        {parserStatus && <p className="mt-2">{parserStatus}</p>}
      </div>

      {/* ====== Керування користувачами ====== */}
      <div className="mb-10 p-4 bg-white dark:bg-gray-800 rounded shadow">
        <h2 className="text-xl mb-2 font-semibold">
          Додати нового користувача
        </h2>
        <div className="flex flex-wrap gap-2 mb-4">
          <input
            type="text"
            placeholder="Username"
            className="border p-2 rounded"
            value={newUser.username}
            onChange={(e) =>
              setNewUser({ ...newUser, username: e.target.value })
            }
          />
          <input
            type="email"
            placeholder="Email"
            className="border p-2 rounded"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
          <select
            className="border p-2 rounded"
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="superadmin">SuperAdmin</option>
          </select>
          <input
            type="password"
            placeholder="Password"
            className="border p-2 rounded"
            value={newUser.password}
            onChange={(e) =>
              setNewUser({ ...newUser, password: e.target.value })
            }
          />
          <button
            onClick={handleAddUser}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            Додати
          </button>
        </div>

        <table className="min-w-full bg-white dark:bg-gray-800 rounded shadow">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700 text-left">
              <th className="p-3">Username</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Дії</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr
                  key={user._id}
                  className="border-t border-gray-300 dark:border-gray-700"
                >
                  <td className="p-3">{user.username}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.role}</td>
                  <td className="p-3">
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Видалити
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-3">
                  Користувачів не знайдено.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ====== Керування героями ====== */}
      <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
        <h2 className="text-xl mb-2 font-semibold">Додати героя</h2>
        <div className="flex flex-wrap gap-2 mb-4">
          <input
            type="text"
            placeholder="Name"
            className="border p-2 rounded"
            value={newHero.name}
            onChange={(e) => setNewHero({ ...newHero, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Image URL"
            className="border p-2 rounded"
            value={newHero.img}
            onChange={(e) => setNewHero({ ...newHero, img: e.target.value })}
          />
          <input
            type="text"
            placeholder="Page URL"
            className="border p-2 rounded"
            value={newHero.url}
            onChange={(e) => setNewHero({ ...newHero, url: e.target.value })}
          />
          <input
            type="text"
            placeholder="Class"
            className="border p-2 rounded"
            value={newHero.class}
            onChange={(e) => setNewHero({ ...newHero, class: e.target.value })}
          />
          <input
            type="text"
            placeholder="Name URL"
            className="border p-2 rounded"
            value={newHero.name_url}
            onChange={(e) =>
              setNewHero({ ...newHero, name_url: e.target.value })
            }
          />
          <button
            onClick={handleAddHero}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            Додати
          </button>
        </div>

        <table className="min-w-full bg-white dark:bg-gray-800 rounded shadow">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700 text-left">
              <th className="p-3">Name</th>
              <th className="p-3">Class</th>
              <th className="p-3">Дії</th>
            </tr>
          </thead>
          <tbody>
            {heroes.length > 0 ? (
              heroes.map((hero) => (
                <tr
                  key={hero._id}
                  className="border-t border-gray-300 dark:border-gray-700"
                >
                  <td className="p-3">{hero.name}</td>
                  <td className="p-3">{hero.class}</td>
                  <td className="p-3">
                    <button
                      onClick={() => handleDeleteHero(hero._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Видалити
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="p-3">
                  Героїв не знайдено.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
