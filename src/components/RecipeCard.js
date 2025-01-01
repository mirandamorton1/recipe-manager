import React, { useState } from 'react';
import styles from '../styles/RecipeCard.module.scss';
import { FaHeart, FaRegHeart, FaMapMarkerAlt } from 'react-icons/fa';

const RecipeCard = ({ recipe, onFavoriteToggle, onLocationClick }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showIngredientsModal, setShowIngredientsModal] = useState(false);
  const [showInstructionsModal, setShowInstructionsModal] = useState(false);
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    onFavoriteToggle(recipe); 
  };

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>{recipe.title}</h2>
      <p className={styles.type}>{recipe.type}</p>
      
      <div className={styles.actions}>
        <button
          className={styles.linkButton}
          onClick={() => setShowIngredientsModal(true)}
        >
          See Ingredients
        </button>
        <button
          className={styles.linkButton}
          onClick={() => setShowInstructionsModal(true)}
        >
          See Instructions
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
        {isFavorite ? (
          <FaHeart
            className={`${styles.icon} ${styles.heartFilled}`}
            onClick={toggleFavorite}
          />
        ) : (
          <FaRegHeart className={styles.icon} onClick={toggleFavorite} />
        )}
      </div>

      {/* Ingredients Modal */}
      {showIngredientsModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Ingredients</h3>
            <ul>
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
            <button
              className={styles.closeButton}
              onClick={() => setShowIngredientsModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Instructions Modal */}
      {showInstructionsModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Instructions</h3>
            <p>{recipe.instructions}</p>
            <button
              className={styles.closeButton}
              onClick={() => setShowInstructionsModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Notes Modal */}
      {showNotesModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Notes</h3>
            <textarea
              defaultValue={recipe.notes}
              className={styles.textArea}
            ></textarea>
            <button
              className={styles.saveButton}
              onClick={() => setShowNotesModal(false)}
            >
              Save
            </button>
            <button
              className={styles.closeButton}
              onClick={() => setShowNotesModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Location Modal */}
      {showLocationModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Location</h3>
            <p>{recipe.location}</p>
            <button
              className={styles.closeButton}
              onClick={() => setShowLocationModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default RecipeCard;

  
  