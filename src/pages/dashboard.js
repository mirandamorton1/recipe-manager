import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const res = await fetch('/api/auth/me', {
        method: 'GET',
        credentials: 'include', 
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data);
      } else {
        router.push('/login'); 
      }
    };

    fetchUserData();
  }, [router]);

  const handleLogout = async () => {
    const res = await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include', 
    });

    if (res.ok) {
      router.push('/login'); 
    } else {
      console.error('Logout failed');
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {user.email}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
