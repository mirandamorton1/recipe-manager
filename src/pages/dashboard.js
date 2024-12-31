import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import RecipeCard from '@/components/RecipeCard';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/auth/me', {
          method: 'GET',
          credentials: 'include',
        });

        if (res.ok) {
          const data = await res.json();
          const updatedUser = { ...data, id: data.userId };
          if (!user || user.id !== updatedUser.id) {
            // console.log("Fetched user data:", updatedUser);
            setUser(updatedUser);
            // console.log("Fetching recipes for userId:", updatedUser.id);
            const recipesRes = await fetch(`/api/recipes?id=${updatedUser.id}`, {
              method: 'GET',
              credentials: 'include',
            });

            if (recipesRes.ok) {
              const recipesData = await recipesRes.json();
              // console.log("Fetched recipes:", recipesData);
              setRecipes(recipesData);
            } else {
              throw new Error("Failed to fetch recipes");
            }
          }
        } else {
          router.push('/login'); 
        }
      } catch (err) {
        console.error(err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router, user]); 

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

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {user?.email}</p>
      <button onClick={handleLogout}>Logout</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div>
        {recipes.length === 0 ? (
          <p>No recipes found. Get started by creating your first recipe!</p>
        ) : (
          recipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)
        )}
      </div>
    </div>
  );
};

export default Dashboard;
