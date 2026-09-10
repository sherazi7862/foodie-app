import React, { createContext, useState, useContext } from 'react';
import { initialRecipes, generateId } from '../data/recipes';

const RecipeContext = createContext();

export function RecipeProvider({ children }) {
  const [recipes] = useState(initialRecipes);
  const [myRecipes, setMyRecipes] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState([]);

  const allRecipes = [...recipes, ...myRecipes];

  const toggleFavorite = (recipeId) => {
    setFavoriteIds((prev) =>
      prev.includes(recipeId) ? prev.filter((id) => id !== recipeId) : [...prev, recipeId]
    );
  };

  const isFavorite = (recipeId) => favoriteIds.includes(recipeId);

  const favoriteRecipes = allRecipes.filter((r) => favoriteIds.includes(r.id));

  const addRecipe = (recipe) => {
    const newRecipe = {
      ...recipe,
      id: generateId(),
      category: 'My Food',
    };
    setMyRecipes((prev) => [...prev, newRecipe]);
    return newRecipe;
  };

  const updateRecipe = (recipeId, updates) => {
    setMyRecipes((prev) => prev.map((r) => (r.id === recipeId ? { ...r, ...updates } : r)));
  };

  const deleteRecipe = (recipeId) => {
    setMyRecipes((prev) => prev.filter((r) => r.id !== recipeId));
    setFavoriteIds((prev) => prev.filter((id) => id !== recipeId));
  };

  const getRecipeById = (recipeId) => allRecipes.find((r) => r.id === recipeId);

  return (
    <RecipeContext.Provider
      value={{
        recipes,
        myRecipes,
        allRecipes,
        favoriteRecipes,
        toggleFavorite,
        isFavorite,
        addRecipe,
        updateRecipe,
        deleteRecipe,
        getRecipeById,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
}

export function useRecipes() {
  return useContext(RecipeContext);
}
