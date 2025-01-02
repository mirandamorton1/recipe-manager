import React from 'react';
import styles from '../styles/Modal.module.scss';

const LocationModal = ({ recipe, closeModal }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h3>Location</h3>
        <p>{recipe.location}</p>
        <button className={styles.closeButton} onClick={closeModal}>
          Close
        </button>
      </div>
    </div>
  );
};

export default LocationModal;
