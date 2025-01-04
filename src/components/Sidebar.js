import React from "react";
import { useState } from "react";
import { FaTimes, FaUserCircle, FaRegHeart, FaPlus, FaSignOutAlt } from 'react-icons/fa';
import styles from "../styles/Sidebar.module.scss";
import ProfileModal from "../components/ProfileModal";
import FavoritesModal from "../components/FavoritesModal";
import NewRecipeModal from "../components/NewRecipeModal";
const Sidebar = ({
  isOpen,
  toggleSidebar,
  logout,
  user,
  favorites,
  addRecipe,
  setUser,
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
    <div className={`${styles.sidebar} ${isOpen ? '' : styles.closed}`}>
      <button className={styles.closeButton} onClick={toggleSidebar}>
        <FaTimes />
      </button>
      <ul className={styles.sidebarMenu}>
        <li onClick={openProfileModal}><FaUserCircle />Profile</li>
        <li onClick={openFavoritesModal}><FaRegHeart />My Favorites</li>
        <li onClick={openNewRecipeModal}><FaPlus />New Recipe</li>
        <li onClick={handleLogout}><FaSignOutAlt />Logout</li>
      </ul>

      {isProfileModalOpen && (
        <ProfileModal user={user} close={closeProfileModal} updateUser={setUser}  />
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
