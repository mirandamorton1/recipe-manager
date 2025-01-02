import React from "react";
import { useState } from "react";
import styles from "../styles/Sidebar.module.scss";
import ProfileModal from "../components/ProfileModal";
import FavoritesModal from "../components/FavoritesModal";
import NewRecipeModal from "../components/NewRecipeModal";
import RecipeCard from "../components/RecipeCard";

const Sidebar = ({
  isOpen,
  toggleSidebar,
  logout,
  user,
  favorites,
  recipes,
  addRecipe,
}) => {
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const [isFavoritesModalOpen, setFavoritesModalOpen] = useState(false);
  const [isNewRecipeModalOpen, setNewRecipeModalOpen] = useState(false);

  const openProfileModal = () => setProfileModalOpen(true);
  const closeProfileModal = () => setProfileModalOpen(false);

  const openFavoritesModal = () => setFavoritesModalOpen(true);
  const closeFavoritesModal = () => setFavoritesModalOpen(false);

  const openNewRecipeModal = () => setNewRecipeModalOpen(true);
  const closeNewRecipeModal = () => setNewRecipeModalOpen(false);

  const handleLogout = () => {
    logout();
    toggleSidebar();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.sidebar}>
      <button className={styles.closeButton} onClick={toggleSidebar}>
        Close
      </button>
      <ul className={styles.sidebarMenu}>
        <li onClick={openProfileModal}>Profile</li>
        <li onClick={openFavoritesModal}>My Favorites</li>
        <li onClick={openNewRecipeModal}>New Recipe</li>
        <li onClick={handleLogout}>Logout</li>
      </ul>

      {isProfileModalOpen && (
        <ProfileModal user={user} close={closeProfileModal} />
      )}
      {isFavoritesModalOpen && (
        <FavoritesModal
          favorites={favorites}
          close={closeFavoritesModal}
        />
      )}
      {isNewRecipeModalOpen && (
        <NewRecipeModal
          userId={user.id}
          close={closeNewRecipeModal}
          addRecipe={addRecipe}
          toggleSidebar={toggleSidebar}
        />
      )}
    </div>
  );
};

export default Sidebar;
