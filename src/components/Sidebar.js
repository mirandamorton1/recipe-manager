import React, { useState, useRef, useEffect, useCallback } from "react";
import { FaTimes, FaUserCircle, FaRegHeart, FaPlus, FaSignOutAlt } from "react-icons/fa";
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
}) => {
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const [isFavoritesModalOpen, setFavoritesModalOpen] = useState(false);
  const [isNewRecipeModalOpen, setNewRecipeModalOpen] = useState(false);

  const sidebarRef = useRef(null);
  const profileModalContentRef = useRef(null);
  const favoritesModalContentRef = useRef(null);
  const newRecipeModalContentRef = useRef(null);

  const openProfileModal = () => setProfileModalOpen(true);
  const closeProfileModal = useCallback(() => setProfileModalOpen(false), []);

  const openFavoritesModal = () => setFavoritesModalOpen(true);
  const closeFavoritesModal = useCallback(() => setFavoritesModalOpen(false), []);

  const openNewRecipeModal = () => setNewRecipeModalOpen(true);
  const closeNewRecipeModal = useCallback(() => setNewRecipeModalOpen(false), []);

  const handleClickOutside = useCallback((event) => {
    if (
      (profileModalContentRef.current && profileModalContentRef.current.contains(event.target)) ||
      (favoritesModalContentRef.current && favoritesModalContentRef.current.contains(event.target)) ||
      (newRecipeModalContentRef.current && newRecipeModalContentRef.current.contains(event.target))
    ) {
      return;
    }
    closeProfileModal();
    closeFavoritesModal();
    closeNewRecipeModal();
  }, [closeProfileModal, closeFavoritesModal, closeNewRecipeModal]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  const handleLogout = () => {
    logout();
    toggleSidebar();
  };

  if (!isOpen) return null;

  return (
    <div ref={sidebarRef} className={`${styles.sidebar} ${isOpen ? "" : styles.closed}`}>
      <button className={styles.closeButton} onClick={toggleSidebar}>
        <FaTimes />
      </button>
      <ul className={styles.sidebarMenu}>
        <li onClick={openProfileModal}>
          <FaUserCircle />
          Profile
        </li>
        <li onClick={openFavoritesModal}>
          <FaRegHeart />
          My Favorites
        </li>
        <li onClick={openNewRecipeModal}>
          <FaPlus />
          New Recipe
        </li>
        <li onClick={handleLogout}>
          <FaSignOutAlt />
          Logout
        </li>
      </ul>

      {isProfileModalOpen && (
        <div>
          <ProfileModal user={user} close={closeProfileModal} modalContentRef={profileModalContentRef} />
        </div>
      )}
      {isFavoritesModalOpen && (
        <div>
          <FavoritesModal favorites={favorites} close={closeFavoritesModal} modalContentRef={favoritesModalContentRef} />
        </div>
      )}
      {isNewRecipeModalOpen && (
        <div>
          <NewRecipeModal
            userId={user.id}
            close={closeNewRecipeModal}
            addRecipe={addRecipe}
            toggleSidebar={toggleSidebar}
            modalContentRef={newRecipeModalContentRef}
          />
        </div>
      )}
    </div>
  );
};

export default Sidebar;