import React from 'react';
import styles from '../styles/Modal.module.scss';

const FavoritesModal = ({ favorites, close }) => {
    return (
      <div>
        <h2>My Favorites</h2>
        {favorites?.length > 0 ? (
          <ul>
            {favorites.map((fav) => (
              <li key={fav.id}>
                {fav.title}
              </li>
            ))}
          </ul>
        ) : (
          <p>No favorites yet.</p>
        )}
        <button onClick={close}>Close</button>
      </div>
    );
  };

export default FavoritesModal;
