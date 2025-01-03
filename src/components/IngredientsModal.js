import React, { useState } from "react";
import styles from "../styles/Modal.module.scss";

const IngredientsModal = ({ recipe, closeModal, handleEditRecipe }) => {
  
  const [ingredients, setIngredients] = useState(recipe.ingredients);
  const [isEditing, setIsEditing] = useState(false); 

  const handleSave = async () => {
    await handleEditRecipe(recipe.id, { ingredients }); 
    setIsEditing(false); 
    closeModal(); 
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h3>Edit Ingredients</h3>

        {!isEditing ? (
          <div>
            <p>{ingredients.join("\n")}</p>
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
              value={ingredients.join("\n")} 
              onChange={(e) => setIngredients(e.target.value.split("\n"))} 
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

export default IngredientsModal;
