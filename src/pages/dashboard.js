import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import RecipeCard from "@/components/RecipeCard";
import Sidebar from "@/components/SideBar";
import styles from "../styles/Dashboard.module.scss";
import { FiMenu } from "react-icons/fi";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/auth/me", {
          method: "GET",
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          const updatedUser = { ...data, id: data.userId };
          if (!user || user.id !== updatedUser.id) {
            console.log("Fetched user data:", updatedUser);
            setUser(updatedUser);
            // console.log("Fetching recipes for userId:", updatedUser.id);
            const recipesRes = await fetch(
              `/api/recipes?id=${updatedUser.id}`,
              {
                method: "GET",
                credentials: "include",
              }
            );

            if (recipesRes.ok) {
              const recipesData = await recipesRes.json();
              // console.log("Fetched recipes:", recipesData);
              setRecipes(recipesData);
            } else {
              throw new Error("Failed to fetch recipes");
            }
          }
        } else {
          router.push("/login");
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
    const res = await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    if (res.ok) {
      router.push("/login");
    } else {
      console.error("Logout failed");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <button className={styles.menuButton} onClick={toggleSidebar}>
          <FiMenu size={24} />
        </button>
        <h1>Welcome, {user.name}</h1>
      </div>

      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className={styles.content}>
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
