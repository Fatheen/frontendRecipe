import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; 

function App() {
  const [message, setMessage] = useState('');
  const [image, setImage] = useState(null);
  const [ingredients, setIngredients] = useState([]); 
  const [recipes, setRecipes] = useState([]); 
 
  const handleFileChange = (event) => {
    setImage(event.target.files[0]);
  };

 
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(response.data.message); 
      setIngredients(response.data.ingredients || []); 
      setRecipes(response.data.recipes || []); 
    } catch (error) {
      console.error('Error uploading file:', error);
      setMessage('Failed to upload image');
    }
  };

  return (
    <div className="App">
      <h1>Ingredient-Recipe App</h1>
      
      {/* Image Upload Form */}
      <form onSubmit={handleSubmit} className="upload-form">
        <input type="file" onChange={handleFileChange} accept="image/*" className="upload-input" />
        <button type="submit" className="upload-button">Upload Image</button>
      </form>

      <p>{message}</p>

      {/* Display Detected Ingredients */}
      {ingredients.length > 0 && (
        <div>
          <h2>Detected Ingredients:</h2>
          <ul>
            {ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Display Recipes in Cards */}
      {recipes.length > 0 && (
        <div className="recipe-container">
          {recipes.map((recipe, index) => (
            <div className="recipe-card" key={index}>
              <img 
                src={recipe.url} 
                alt={recipe.title} 
                className="recipe-image" 
                style={{ maxWidth: '100%', height: 'auto' }}
              />
              <div className="recipe-details">
                <h3>{recipe.title}</h3>
                <a href={recipe.url} target="_blank" rel="noopener noreferrer" className="recipe-link">
                  View Recipe
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
