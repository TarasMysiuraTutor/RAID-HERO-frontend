import React, { useState } from "react";
import { Link } from "react-router-dom";
import heroes from "../../locales/heroes_all.json"; // JSON з усіма героями
import { useLanguage } from "../../context/LanguageContext.js"; // Контекст для мови

export default function HeroList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [filter, setFilter] = useState("");
  const { language } = useLanguage();

  const filteredHeroes = heroes.filter((hero) => {
    const name =
      hero.details?.[language]?.name || hero.details?.en?.name || hero.name;
    return name.toLowerCase().includes(filter.toLowerCase());
  });

  const totalPages = Math.ceil(filteredHeroes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentHeroes = filteredHeroes.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Фільтр і вибір кількості */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Пошук героя..."
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="border rounded px-3 py-2 w-full md:w-1/3 dark:bg-gray-700 dark:text-white"
        />
        <select
          value={itemsPerPage}
          onChange={(e) => {
            setItemsPerPage(Number(e.target.value));
            setCurrentPage(1);
          }}
          className="border rounded px-3 py-2 dark:bg-gray-700 dark:text-white"
        >
          <option value={12}>12 на сторінку</option>
          <option value={24}>24 на сторінку</option>
          <option value={48}>48 на сторінку</option>
        </select>
      </div>

      {/* Сітка карток */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {currentHeroes.map((hero) => {
          const details = hero.details?.[language] || hero.details?.en || {};
          // console.log(hero._id.$oid || hero.id); // Для MongoDB або інших ID
          return (
            <Link
              key={hero._id.$oid || hero.id} // Використовуємо $oid для MongoDB або id для інших
              to={`/hero/${hero._id.$oid || hero.id}`}
              className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition p-2 flex flex-col items-center"
            >
              <img
                src={hero.img}
                alt={details.name || hero.name}
                className="rounded-md max-h-40 object-contain"
              />
              <p className="mt-2 font-semibold text-center dark:text-white">
                {details.name || hero.name}
              </p>
            </Link>
          );
        })}
      </div>

      {/* Сітка карток
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {currentHeroes.map((hero) => (
          <li>
            <Link
              key={hero.id} // ✅ стабільний ключ
              to={`/hero/${hero.id}`}
              className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden hover:scale-105 transition-transform"
            >
              <img
                src={hero.img}
                alt={hero.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-2 text-center">
                <h3 className="font-bold">{hero.name}</h3>
                <p className="text-sm opacity-80">{hero.class}</p>
              </div>
            </Link>
          </li>
        ))}
      </div> */}

      {/* Пагінація */}
      <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded dark:bg-gray-700 dark:text-white"
        >
          ←
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 border rounded ${
              currentPage === i + 1
                ? "bg-blue-500 text-white"
                : "dark:bg-gray-700 dark:text-white"
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded dark:bg-gray-700 dark:text-white"
        >
          →
        </button>
      </div>
    </div>
  );
}
