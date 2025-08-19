import React, { useEffect, useState } from "react";
import axios from "../../api/axios";

export default function AdminApprovals() {
  const [pendingAdmins, setPendingAdmins] = useState([]);

  useEffect(() => {
    fetchPendingAdmins();
  }, []);

  const fetchPendingAdmins = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("/superadmin/pending-admins", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPendingAdmins(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const approveAdmin = async (id) => {
    const token = localStorage.getItem("token");
    await axios.put(
      `/superadmin/approve/${id}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    fetchPendingAdmins();
  };

  const rejectAdmin = async (id) => {
    const token = localStorage.getItem("token");
    await axios.delete(`/superadmin/reject/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchPendingAdmins();
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Pending Admin Approvals</h2>
      {pendingAdmins.length === 0 ? (
        <p>No pending admins</p>
      ) : (
        <ul>
          {pendingAdmins.map((admin) => (
            <li
              key={admin._id}
              className="flex justify-between items-center mb-2 p-2 border rounded"
            >
              <span>
                {admin.username} ({admin.email})
              </span>
              <div>
                <button
                  onClick={() => approveAdmin(admin._id)}
                  className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                >
                  Approve
                </button>
                <button
                  onClick={() => rejectAdmin(admin._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Reject
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
