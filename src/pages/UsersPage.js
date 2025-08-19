import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { useAuth } from '../auth/AuthContext';

export default function UsersPage() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('');
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get('/users', {
          params: filter ? { role: filter } : {},
        });
        setUsers(res.data);
      } catch (err) {
        console.error('Fetch error:', err);
      }
    };

    fetchUsers();
  }, [filter, reload]);

  const handleDelete = async (id) => {
    if (!window.confirm('Ви впевнені, що хочете видалити цього користувача?')) return;
    try {
      await api.delete(`/users/${id}`);
      setReload(!reload);
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  if (user.role !== 'superadmin') return <p>❌ Доступ заборонено</p>;

  return (
    <div>
      <h2>👥 Користувачі</h2>

      <label>
        Фільтр за роллю:
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="">Всі</option>
          <option value="user">user</option>
          <option value="admin">admin</option>
          <option value="superadmin">superadmin</option>
        </select>
      </label>

      <ul>
        {users.map((u) => (
          <li key={u._id}>
            🧍 {u.username} ({u.email}) — <b>{u.role}</b>
            {u.role !== 'superadmin' && (
              <>
                <button onClick={() => handleDelete(u._id)}>❌ Видалити</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
