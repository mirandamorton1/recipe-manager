import React from 'react';
import styles from '../styles/Modal.module.scss';

const FavoritesModal = ({ favorites, close, recipes }) => {
    const favoriteRecipes = recipes.filter((recipe) => recipe.isFavorite);
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>My Favorites</h2>
        {favorites.length > 0 ? (
          <ul>
            {favoriteRecipes.map((recipe) => (
              <li key={recipe.id}>{recipe.title}</li>
            ))}
          </ul>
        ) : (
          <p>No favorites yet.</p>
        )}
        <button onClick={close}>Close</button>
      </div>
    </div>
  );
};

export default FavoritesModal;
