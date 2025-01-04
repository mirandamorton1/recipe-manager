import React from "react";
import styles from "../styles/RecipeCard.module.scss";
import { FaHeart, FaRegHeart, FaMapMarkerAlt, FaTrash } from "react-icons/fa";

const RecipeCard = ({
  recipe,
  handleFavoriteToggle,
  favorites,
  handleDeleteClick,
  setShowIngredientsModal,
  setShowInstructionsModal,
  setShowNotesModal,
  setShowLocationModal,
  setSelectedRecipe,
}) => {

  const isFavorited = favorites.some((fav) => fav.id === recipe.id);

  const openIngredientsModal = () => {
    setSelectedRecipe(recipe);
    setShowIngredientsModal(true);
  };

  const openInstructionsModal = () => {
    setSelectedRecipe(recipe);
    setShowInstructionsModal(true);
  };

  const openNotesModal = () => {
    setSelectedRecipe(recipe);
    setShowNotesModal(true);
  };

  const openLocationModal = () => {
    setSelectedRecipe(recipe);
    setShowLocationModal(true);
  }

  return (
    <div className={styles.card}>
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>{recipe.title}</h2>
        <FaTrash
          className={styles.deleteIcon}
          onClick={() => handleDeleteClick(recipe)}
        />
      </div>
      <p className={styles.type}>{recipe.type}</p>

      <div className={styles.actions}>
        <button
          className={styles.linkButton}
          onClick={openIngredientsModal}
        >
          Ingredients
        </button>
        <button
          className={styles.linkButton}
          onClick={openInstructionsModal}
        >
          Instructions
        </button>
        <button
          className={styles.linkButton}
          onClick={openNotesModal}
        >
          Notes
        </button>
        <FaMapMarkerAlt
          className={styles.icon}
          onClick={openLocationModal}
        />
        {isFavorited ? (
          <FaHeart
            style={{ cursor: "pointer", color: "red" }}
            onClick={() => handleFavoriteToggle(recipe)}
          />
        ) : (
          <FaRegHeart
            style={{ cursor: "pointer", color: "red" }}
            onClick={() => handleFavoriteToggle(recipe)}
          />
        )}
      </div>
    </div>
  );
};

export default RecipeCard;
