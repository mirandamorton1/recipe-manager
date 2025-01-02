import React, { useState } from 'react';
import styles from '../styles/Modal.module.scss';

const NewRecipeModal = ({ userId, close, addRecipe, toggleSidebar }) => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [notes, setNotes] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newRecipe = {
      title,
      type,
      ingredients: ingredients.split(',').map((item) => item.trim()),
      instructions: instructions.split(',').map((item) => item.trim()),
      notes,
      location,
      userId 
    };
  
    try {
      const response = await fetch('/api/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRecipe),
      });
  
      if (response.ok) {
        const createdRecipe = await response.json();
        addRecipe(createdRecipe);
        console.log('Recipe created successfully:', createdRecipe);
        close();
        toggleSidebar(); 
      } else {
        console.error('Failed to create recipe');
      }
    } catch (error) {
      console.error('Error submitting recipe:', error);
    }
  };
  

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>New Recipe</h2>
        <form onSubmit={handleSubmit}>
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
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
          />
          <label>Instructions:</label>
          <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            required
          />
          <label>Notes:</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
          <label>Location:</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <button type="submit">Save Recipe</button>
        </form>
        <button onClick={close}>Close</button>
      </div>
    </div>
  );
};

export default NewRecipeModal;
