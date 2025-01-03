import React, { useState } from 'react';
import styles from '../styles/Modal.module.scss';

const LocationModal = ({ recipe, closeModal, handleEditRecipe }) => {
  const [location, setLocation] = useState(recipe.location);
  const [isEditing, setIsEditing] = useState(false); 

  const handleSave = async () => {
    await handleEditRecipe(recipe.id, { location }); 
    setIsEditing(false); 
    closeModal(); 
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h3>Location</h3>

        {!isEditing ? (
          <div>
            <p>{location}</p>
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
              value={location} 
              onChange={(e) => setLocation(e.target.value)} 
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

export default LocationModal;
