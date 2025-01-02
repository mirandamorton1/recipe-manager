import React, { useState } from "react";
import styles from "../styles/RecipeCard.module.scss";
import { FaHeart, FaRegHeart, FaMapMarkerAlt } from "react-icons/fa";
import IngredientsModal from "./FavoritesModal";
import InstructionsModal from "./InstructionsModal";
import NotesModal from "./NotesModal";
import LocationModal from "./LocationModal";

const RecipeCard = ({ recipe, handleFavoriteToggle, favorites }) => {
  const [showIngredientsModal, setShowIngredientsModal] = useState(false);
  const [showInstructionsModal, setShowInstructionsModal] = useState(false);
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);

  const isFavorited = favorites.some((fav) => fav.id === recipe.id);

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>{recipe.title}</h2>
      <p className={styles.type}>{recipe.type}</p>

      <div className={styles.actions}>
        <button
          className={styles.linkButton}
          onClick={() => setShowIngredientsModal(true)}
        >
          Ingredients
        </button>
        <button
          className={styles.linkButton}
          onClick={() => setShowInstructionsModal(true)}
        >
          Instructions
        </button>
        <button
          className={styles.linkButton}
          onClick={() => setShowNotesModal(true)}
        >
          Notes
        </button>
        <FaMapMarkerAlt
          className={styles.icon}
          onClick={() => setShowLocationModal(true)}
        />
        {isFavorited ? (
          <FaHeart
            style={{ cursor: "pointer", color: "red" }}
            onClick={() => handleFavoriteToggle(recipe)} 
          />
        ) : (
          <FaRegHeart
            style={{ cursor: "pointer", color: "black" }}
            onClick={() => handleFavoriteToggle(recipe)}
          />
        )}
      </div>

      {/* Ingredients Modal */}
      {showIngredientsModal && (
        <IngredientsModal
          recipe={recipe}
          closeModal={() => setShowIngredientsModal(false)}
        />
      )}

      {showInstructionsModal && (
        <InstructionsModal
          recipe={recipe}
          closeModal={() => setShowInstructionsModal(false)}
        />
      )}

      {showNotesModal && (
        <NotesModal
          recipe={recipe}
          closeModal={() => setShowNotesModal(false)}
        />
      )}

      {showLocationModal && (
        <LocationModal
          recipe={recipe}
          closeModal={() => setShowLocationModal(false)}
        />
      )}
    </div>
  );
};

export default RecipeCard;
