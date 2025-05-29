'use client';

import { useEffect, useState } from 'react';
import { getMonitoredUsers } from '../../../lib/services/adminService';
import { useAuth } from '../../../context/AuthContext';
import { MonitoredUser } from '../../../types/monitoredUser';

export default function MonitoredUsersPage() {
  const [users, setUsers] = useState<MonitoredUser[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth(); // assumes useAuth() provides token + role

  useEffect(() => {
    if (user?.role !== 'Admin') {
      return;
    }

    getMonitoredUsers(user.token!)
      .then(setUsers)
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [user]);

  if (!user || user.token || user?.role !== 'Admin') {
    return <p>Access denied. Admins only.</p>;
  }

  if (loading) return <p>Loading monitored users...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Monitored Users</h1>
      {users.length === 0 ? (
        <p>No suspicious activity found.</p>
      ) : (
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 text-left">Username</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Reason</th>
              <th className="p-2 text-left">Last Activity</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t border-gray-300">
                <td className="p-2">{u.username}</td>
                <td className="p-2">{u.email}</td>
                <td className="p-2">{new Date(u.lastActivity).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
