import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useAuth } from "../../auth/AuthContext";

export default function SuperAdminApprovePage() {
  const { token } = useAuth();
  const [pendingAdmins, setPendingAdmins] = useState([]);

  // Отримати список pending_admin
  useEffect(() => {
    const fetchPending = async () => {
      try {
        const res = await axios.get("/admin/pending-admins", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPendingAdmins(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPending();
  }, [token]);

  const approveAdmin = async (id) => {
    try {
      await axios.patch(
        `/admin/approve-admin/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setPendingAdmins(pendingAdmins.filter((u) => u._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const rejectAdmin = async (id) => {
    try {
      await axios.delete(`/admin/reject-admin/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPendingAdmins(pendingAdmins.filter((u) => u._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h1>Pending Admin Requests</h1>
      {pendingAdmins.length === 0 ? (
        <p>No pending admin requests</p>
      ) : (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingAdmins.map((user) => (
              <tr key={user._id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <button onClick={() => approveAdmin(user._id)}>
                    ✅ Approve
                  </button>
                  <button onClick={() => rejectAdmin(user._id)}>
                    ❌ Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
