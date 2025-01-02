import React from 'react';
import styles from '../styles/Modal.module.scss';

const InstructionsModal = ({ recipe, closeModal }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h3>Instructions</h3>
        <p>{recipe.instructions}</p>
        <button className={styles.closeButton} onClick={closeModal}>
          Close
        </button>
      </div>
    </div>
  );
};

export default InstructionsModal;
