import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import RecipeCard from "@/components/RecipeCard";
import Sidebar from "@/components/Sidebar";
import ConfirmationModal from "../components/ConfirmationModal";
import styles from "../styles/Dashboard.module.scss";
import { FiMenu } from "react-icons/fi";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [recipeToDelete, setRecipeToDelete] = useState(null);
  const [isNotesModalOpen, setIsNotesModalOpen] = useState(false);
  const [currentRecipe, setCurrentRecipe] = useState(null); 
  const router = useRouter();

  const addRecipe = (newRecipe) => {
    setRecipes((prevRecipes) => [...prevRecipes, newRecipe]);
  };

  const handleDeleteClick = (recipe) => {
    console.log("Deleting recipe:", recipe);
    setRecipeToDelete(recipe);
    setIsConfirmationModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (recipeToDelete) {
      const res = await fetch(`/api/recipes/${recipeToDelete.id}`, {
        method: "DELETE",
      });
  
      if (res.ok) {
        // Update the local state to remove the deleted recipe
        setRecipes((prevRecipes) =>
          prevRecipes.filter((recipe) => recipe.id !== recipeToDelete.id)
        );
        setFavorites((prevFavorites) =>
          prevFavorites.filter((fav) => fav.id !== recipeToDelete.id)
        );
      } else {
        console.error("Failed to delete recipe");
      }
    }
    setIsConfirmationModalOpen(false);
  };
  

  const handleDeleteCancel = () => {
    setIsConfirmationModalOpen(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleFavoriteToggle = async (recipe) => {
    const isFavorited = favorites.some((fav) => fav.id === recipe.id);

    const res = await fetch(`/api/recipes/${recipe.id}`, {
      method: isFavorited ? "DELETE" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      const updatedRecipe = await res.json();
      if (isFavorited) {
        setFavorites(favorites.filter((fav) => fav.id !== recipe.id));
      } else {
        setFavorites([...favorites, updatedRecipe]);
      }
    } else {
      console.error("Failed to update favorite status");
    }
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

      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        logout={handleLogout}
        user={user}
        favorites={favorites}
        recipes={recipes}
        addRecipe={addRecipe}
        setUser={setUser}
      />

      <div className={styles.content}>
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            favorites={favorites}
            handleFavoriteToggle={handleFavoriteToggle}
            handleDeleteClick={handleDeleteClick}
          />
        ))}
      </div>

      {isConfirmationModalOpen && (
        <ConfirmationModal
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
          recipe={recipeToDelete}
        />
      )}
    </div>
  );
};

export default Dashboard;
