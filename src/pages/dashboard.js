import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/router";
import RecipeCard from "@/components/RecipeCard";
import Sidebar from "@/components/Sidebar";
import ConfirmationModal from "../components/ConfirmationModal";
import IngredientsModal from "../components/IngredientsModal";
import InstructionsModal from "../components/InstructionsModal";
import NotesModal from "../components/NotesModal";
import LocationModal from "../components/LocationModal";
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
  const [showIngredientsModal, setShowIngredientsModal] = useState(false);
  const [showInstructionsModal, setShowInstructionsModal] = useState(false);
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [filterType, setFilterType] = useState("");
  const [searchTitle, setSearchTitle] = useState("");
  const router = useRouter();

  const sidebarRef = useRef(null);
  const ingredientsModalRef = useRef(null);
  const instructionsModalRef = useRef(null);
  const notesModalRef = useRef(null);
  const locationModalRef = useRef(null);

  const addRecipe = (newRecipe) => {
    setRecipes((prevRecipes) => [...prevRecipes, newRecipe]);
  };

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesType = filterType
      ? recipe.type?.toLowerCase().includes(filterType.toLowerCase())
      : true;
  
    const matchesSearch = searchTitle
      ? recipe.title?.toLowerCase().includes(searchTitle.toLowerCase())
      : true;
  
    return matchesType && matchesSearch;
  });

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
    const updatedFields = { isFavorite: !recipe.isFavorite };

    const res = await fetch(`/api/recipes/${recipe.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedFields),
    });

    if (res.ok) {
      const updatedRecipe = await res.json();
      setRecipes((prevRecipes) =>
        prevRecipes.map((r) => (r.id === recipe.id ? updatedRecipe : r))
      );
    } else {
      console.error("Failed to toggle favorite");
    }
  };

  const handleEditRecipe = async (recipeId, updatedFields) => {
    const res = await fetch(`/api/recipes/${recipeId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedFields),
    });

    if (res.ok) {
      const updatedRecipe = await res.json();
      setRecipes((prevRecipes) =>
        prevRecipes.map((recipe) =>
          recipe.id === recipeId ? updatedRecipe : recipe
        )
      );
    } else {
      console.error("Failed to update recipe");
    }
  };

  useEffect(() => {
    const favoriteRecipes = recipes.filter((recipe) => recipe.isFavorite);
    setFavorites(favoriteRecipes);
  }, [recipes]);

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
              recipesData.sort((a, b) => a.id - b.id);
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

  const handleClickOutside = useCallback((event) => {
    if (
      (sidebarRef.current && sidebarRef.current.contains(event.target)) ||
      (ingredientsModalRef.current &&
        ingredientsModalRef.current.contains(event.target)) ||
      (instructionsModalRef.current &&
        instructionsModalRef.current.contains(event.target)) ||
      (notesModalRef.current && notesModalRef.current.contains(event.target)) ||
      (locationModalRef.current &&
        locationModalRef.current.contains(event.target))
    ) {
      return;
    }
    setShowIngredientsModal(false);
    setShowInstructionsModal(false);
    setShowNotesModal(false);
    setShowLocationModal(false);

    setIsSidebarOpen(false);
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <button className={styles.menuButton} onClick={toggleSidebar}>
          <FiMenu size={24} />
        </button>
        <h1>{user.name}&apos;s Recipe Box</h1>
        <div className={styles.sortDropdown}>
          <label htmlFor="sort-by-type">Sort by Type</label>
          <select
            id="sort-by-type"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="">All</option>
            <option value="Chicken">Chicken</option>
            <option value="Pork">Pork</option>
            <option value="Beef">Beef</option>
            <option value="Soup">Soup</option>
            <option value="Veggie">Veggie</option>
            <option value="Pasta">Pasta</option>
            <option value="Side">Side</option>
            <option value="App">App</option>
            <option value="Bread">Bread</option>
            <option value="Dessert">Dessert</option>
            <option value="Sauce">Sauce</option>
          </select>
          <label htmlFor="search">Search by title: </label>
          <input
            type="text"
            id="search"
            placeholder="Search recipes..."
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
            className={styles.searchInput}
          />
        </div>
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
        ref={sidebarRef}
      />

      <div className={styles.content}>
        {filteredRecipes.length === 0 ? (
          <div className={styles.noRecipesWrapper}>
            <p className={styles.noRecipesMessage}>
              {filterType
                ? `No recipes found for type "${filterType}".`
                : "You have no recipes! Add a new recipe to get started."}
            </p>
          </div>
        ) : (
          filteredRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              favorites={favorites}
              handleFavoriteToggle={handleFavoriteToggle}
              handleDeleteClick={handleDeleteClick}
              handleEditRecipe={handleEditRecipe}
              setShowIngredientsModal={setShowIngredientsModal}
              setShowInstructionsModal={setShowInstructionsModal}
              setShowLocationModal={setShowLocationModal}
              setShowNotesModal={setShowNotesModal}
              setSelectedRecipe={setSelectedRecipe}
            />
          ))
        )}
      </div>

      {isConfirmationModalOpen && (
        <ConfirmationModal
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
          recipe={recipeToDelete}
          isConfirmationModalOpen={isConfirmationModalOpen}
        />
      )}

      {showIngredientsModal && (
        <IngredientsModal
          recipe={selectedRecipe}
          closeModal={() => setShowIngredientsModal(false)}
          handleEditRecipe={handleEditRecipe}
          ref={ingredientsModalRef}
        />
      )}

      {showInstructionsModal && (
        <InstructionsModal
          recipe={selectedRecipe}
          closeModal={() => setShowInstructionsModal(false)}
          handleEditRecipe={handleEditRecipe}
          ref={instructionsModalRef}
        />
      )}
      {showNotesModal && (
        <NotesModal
          recipe={selectedRecipe}
          closeModal={() => setShowNotesModal(false)}
          handleEditRecipe={handleEditRecipe}
          ref={notesModalRef}
        />
      )}
      {showLocationModal && (
        <LocationModal
          recipe={selectedRecipe}
          closeModal={() => setShowLocationModal(false)}
          handleEditRecipe={handleEditRecipe}
          ref={locationModalRef}
        />
      )}
    </div>
  );
};

export default Dashboard;
