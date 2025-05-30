"use client";

import { useEffect, useState } from 'react';
import { getMonitoredUsers } from '../../../lib/services/adminService';
import { useAuth } from '@/contexts/AuthContext';
import { MonitoredUser } from '../../../types/monitoredUser';
import { useRouter } from 'next/navigation';

export default function MonitoredUsersPage() {
  const [users, setUsers] = useState<MonitoredUser[]>([]);
  const [loading, setLoading] = useState(true);
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }

    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found');
        }
        const data = await getMonitoredUsers(token);
        setUsers(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [isLoggedIn, router]);

  if (!isLoggedIn) {
    return null;
  }

  if (loading) {
    return <div className="text-white p-6">Loading monitored users...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-white">Monitored Users</h1>
      {users.length === 0 ? (
        <p className="text-white">No suspicious activity found.</p>
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
                <td className="p-2 text-white">{u.username}</td>
                <td className="p-2 text-white">{u.email}</td>
                <td className="p-2 text-white">{new Date(u.lastActivity).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
