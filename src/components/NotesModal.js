import React, { useState } from 'react';
import styles from '../styles/Modal.module.scss';

const NotesModal = ({ recipe, closeModal, handleEditRecipe }) => {
  const [notes, setNotes] = useState(recipe.notes);
  const [isEditing, setIsEditing] = useState(false); 

  const handleSave = async () => {
    await handleEditRecipe(recipe.id, { notes }); 
    setIsEditing(false); 
    closeModal();
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h3>Notes</h3>

        {!isEditing ? (
          <div>
            <p>{notes}</p>
            <button
              className={styles.editButton}
              onClick={() => setIsEditing(true)} 
            >
              Edit
            </button>
          </div>
        ) : (
          <div>
            <textarea
              value={notes} 
              onChange={(e) => setNotes(e.target.value)} 
              className={styles.textArea}
            />
            <button className={styles.saveButton} onClick={handleSave}>
              Save
            </button>
          </div>
        )}

        <button className={styles.closeButton} onClick={closeModal}>
          Close
        </button>
      </div>
    </div>
  );
};

export default NotesModal;
