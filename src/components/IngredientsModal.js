import React, { useState } from "react";
import styles from "../styles/Modal.module.scss";
import { FaRegEdit, FaTimes } from "react-icons/fa";

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
        <div className={styles.modalHeader}>
          <h3>Ingredients</h3>
          <button className={styles.closeButton} onClick={closeModal}>
            <FaTimes size={20} />
          </button>
        </div>
        
        {!isEditing ? (
          <div>
            <p>{ingredients.join("\n")}</p>
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
              value={ingredients.join("\n")}
              onChange={(e) => setIngredients(e.target.value.split("\n"))}
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

export default IngredientsModal;
