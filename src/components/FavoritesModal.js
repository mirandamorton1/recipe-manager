import React from 'react';
import ReactDOM from "react-dom";
import styles from '../styles/Modal.module.scss';
import { FaTimes } from "react-icons/fa";

const FavoritesModal = ({ favorites, close }) => {
    return ReactDOM.createPortal(
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h3>My Favorites</h3>
          <button className={styles.closeButton} onClick={close}>
            <FaTimes size={20} />
          </button>
        </div>
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
      </div>,
      document.body
    );
  };

export default FavoritesModal;
