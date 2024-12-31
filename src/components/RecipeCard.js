const RecipeCard = ({ recipe }) => {
    return (
      <div>
        <h3>{recipe.title}</h3>
        <p>{recipe.ingredients}</p>
        {/* Add other fields as needed */}
      </div>
    );
  };
  
  export default RecipeCard;
  
  