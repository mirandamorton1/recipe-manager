import React from 'react';
import styles from '../styles/Modal.module.scss';

const IngredientsModal = ({ recipe, closeModal }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h3>Ingredients</h3>
        <ul>
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
        <button className={styles.closeButton} onClick={closeModal}>
          Close
        </button>
      </div>
    </div>
  );
};

export default IngredientsModal;
