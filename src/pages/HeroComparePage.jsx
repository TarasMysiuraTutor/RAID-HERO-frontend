import React, { useState, useEffect } from 'react';
import api from '../api/axios';

export default function HeroComparePage() {
  const [heroes, setHeroes] = useState([]);
  const [selected, setSelected] = useState([]);
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    const fetchHeroes = async () => {
      try {
        const res = await api.get('/heroes');
        setHeroes(res.data);
      } catch (err) {
        console.error('Помилка отримання героїв:', err);
      }
    };

    fetchHeroes();
  }, []);

  const toggleHero = (hero) => {
    setSelected((prev) => {
      const exists = prev.find((h) => h._id === hero._id);
      if (exists) {
        return prev.filter((h) => h._id !== hero._id);
      } else {
        return [...prev, hero];
      }
    });
  };

  const handleCompare = () => {
    if (selected.length >= 2) {
      setShowTable(true);
    } else {
      alert('Виберіть щонайменше 2 героїв для порівняння.');
    }
  };

  return (
    <div>
      <h2>⚔️ Порівняння героїв</h2>

      <ul>
        {heroes.map((hero) => (
          <li key={hero._id}>
            <input
              type="checkbox"
              checked={!!selected.find((h) => h._id === hero._id)}
              onChange={() => toggleHero(hero)}
            />
            <img src={hero.img} alt={hero.name} width="40" />
            {hero.name}
          </li>
        ))}
      </ul>

      <button onClick={handleCompare}>Порівняти</button>

      {showTable && (
        <table border="1" style={{ marginTop: '20px' }}>
          <thead>
            <tr>
              <th>Характеристика</th>
              {selected.map((h) => (
                <th key={h._id}>{h.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Клас</td>
              {selected.map((h) => (
                <td key={h._id}>{h.class}</td>
              ))}
            </tr>
            <tr>
              <td>Фракція</td>
              {selected.map((h) => (
                <td key={h._id}>{h.faction}</td>
              ))}
            </tr>
            <tr>
              <td>URL</td>
              {selected.map((h) => (
                <td key={h._id}>
                  <a href={h.url} target="_blank" rel="noreferrer">🡕</a>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}
