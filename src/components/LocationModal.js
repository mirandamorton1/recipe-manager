import React, { useState } from 'react';
import styles from '../styles/Modal.module.scss';
import { FaRegEdit, FaTimes } from "react-icons/fa";

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
      <div className={styles.modalHeader}>
          <h3>Location</h3>
          <button className={styles.closeButton} onClick={closeModal}>
            <FaTimes size={20} />
          </button>
        </div>

        {!isEditing ? (
          <div>
            <p>{location}</p>
            <button
              className={styles.editButton}
              onClick={() => setIsEditing(true)} 
            >
              <FaRegEdit size={20} />
            </button>
          </div>
        ) : (
          <div>
            <textarea
              value={location} 
              onChange={(e) => setLocation(e.target.value)} 
              className={styles.textArea}
            />
            <div className={styles.buttonGroup}>
              <button className={styles.saveButton} onClick={handleSave}>
                Save
              </button>
              <button
                className={styles.cancelButton}
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        
      </div>
    </div>
  );
};

export default LocationModal;
