import { useRouter } from 'next/router';

const Dashboard = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/auth/logout', {
        method: 'POST',
      });

      if (res.ok) {
        router.push('/login');
      } else {
        console.error('Failed to logout');
      }
    } catch (err) {
      console.error('An error occurred while logging out', err);
    }
  };

  return (
    <div>
      <h1>You are now logged in</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;