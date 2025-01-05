import React, { useState, useRef, useEffect, forwardRef } from 'react';
import styles from '../styles/Modal.module.scss';
import { FaRegEdit, FaTimes } from "react-icons/fa";

const LocationModal = forwardRef(({ recipe, closeModal, handleEditRecipe }, ref) => {
  const [location, setLocation] = useState(recipe.location);
  const [isEditing, setIsEditing] = useState(false);
  const modalContentRef = useRef(null); 

  const handleSave = async () => {
    await handleEditRecipe(recipe.id, { location }); 
    setIsEditing(false); 
    closeModal(); 
  };

  useEffect(() => {
      const handleClickOutside = (event) => {
        if (modalContentRef.current && !modalContentRef.current.contains(event.target)) {
          closeModal();
        }
      };
  
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [closeModal]);

  return (
    <div className={styles.modal} ref={ref}>
      <div className={styles.modalContent} ref={modalContentRef} onClick={(e) => e.stopPropagation()}>
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
});

export default LocationModal;
