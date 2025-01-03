import React, { useState } from 'react';
import styles from '../styles/Modal.module.scss';

const InstructionsModal = ({ recipe, closeModal, handleEditRecipe }) => {
  const [instructions, setInstructions] = useState(recipe.instructions);
  const [isEditing, setIsEditing] = useState(false); 

  const handleSave = async () => {
    await handleEditRecipe(recipe.id, { instructions }); 
    setIsEditing(false); 
    closeModal(); 
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h3>Instructions</h3>

        {!isEditing ? (
          <div>
            <p>{instructions}</p>
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
              value={instructions} 
              onChange={(e) => setInstructions(e.target.value)} 
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

export default InstructionsModal;
