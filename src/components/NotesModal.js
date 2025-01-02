import React from 'react';
import styles from '../styles/Modal.module.scss';

const NotesModal = ({ recipe, closeModal }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h3>Notes</h3>
        <textarea
          defaultValue={recipe.notes}
          className={styles.textArea}
        ></textarea>
        <button className={styles.saveButton}>Save</button>
        <button className={styles.closeButton} onClick={closeModal}>
          Close
        </button>
      </div>
    </div>
  );
};

export default NotesModal;
