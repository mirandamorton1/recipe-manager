import React, { useState } from "react";
import ReactDOM from "react-dom";
import styles from "../styles/Modal.module.scss";
import { FaTimes } from "react-icons/fa";

const NewRecipeModal = ({ userId, close, addRecipe, toggleSidebar }) => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [notes, setNotes] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newRecipe = {
      title,
      type,
      ingredients: ingredients.split(",").map((item) => item.trim()),
      instructions: instructions.split(",").map((item) => item.trim()),
      notes,
      location,
      userId,
    };

    try {
      const response = await fetch("/api/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRecipe),
      });

      if (response.ok) {
        const createdRecipe = await response.json();
        addRecipe(createdRecipe);
        console.log("Recipe created successfully:", createdRecipe);
        close();
        toggleSidebar();
      } else {
        console.error("Failed to create recipe");
      }
    } catch (error) {
      console.error("Error submitting recipe:", error);
    }
  };

  return ReactDOM.createPortal(
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h3>New Recipe</h3>
          <button className={styles.closeButton} onClick={close}>
            <FaTimes size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className={styles.newRecipeForm}>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <label>Type:</label>
          <input
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          />
          <label>Ingredients:</label>
          <textarea
            className={styles.textArea}
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
          />
          <label>Instructions:</label>
          <textarea
            className={styles.textArea}
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            required
          />
          <label>Notes:</label>
          <textarea
            className={styles.textArea}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
          <label>Location:</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.saveButton}>
              Save
            </button>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={close}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default NewRecipeModal;
