import { MonitoredUser } from '../../types/monitoredUser';

export async function getMonitoredUsers(token: string): Promise<MonitoredUser[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/monitored-users`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch monitored users');
  }

  return await res.json();
}
