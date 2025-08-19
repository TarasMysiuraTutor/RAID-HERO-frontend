import React, { useEffect, useState } from 'react';
import api from '../api/axios';

export default function HeroListPage() {
  const [heroes, setHeroes] = useState([]);
  const [filters, setFilters] = useState({ class: '', faction: '' });

  useEffect(() => {
    const fetchHeroes = async () => {
      try {
        const res = await api.get('/heroes', { params: filters });
        setHeroes(res.data);
      } catch (err) {
        console.error('Помилка завантаження героїв:', err);
      }
    };

    fetchHeroes();
  }, [filters]);

  const handleChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div>
      <h2>🧙‍♂️ Герої</h2>

      <div>
        <label>
          Клас:
          <input name="class" onChange={handleChange} />
        </label>
        <label>
          Фракція:
          <input name="faction" onChange={handleChange} />
        </label>
      </div>

      <ul>
        {heroes.map((hero) => (
          <li key={hero._id}>
            <img src={hero.img} alt={hero.name} width="40" />
            <strong>{hero.name}</strong> — {hero.class}, {hero.faction}
          </li>
        ))}
      </ul>
    </div>
  );
}
