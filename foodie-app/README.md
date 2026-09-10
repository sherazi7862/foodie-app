# Foodie 🍽️

Foodie is a recipe app built with React Native and Expo. It lets users
browse recipes by category, view full recipe details, favorite recipes,
and manage their own personal recipe collection — including adding new
recipes with photos, editing, and deleting them.

## Features

- **Main feed** with a horizontally scrollable bar of 10+ recipe categories
  (plus a "My Food" entry)
- **Recipe detail pages** showing ingredients, instructions, preparation
  time, servings, calories, and difficulty level
- **Category browsing** — tapping a category loads only recipes in that
  category
- **Favorites** — tap the heart icon on any recipe to favorite/unfavorite it;
  favorited recipes appear in the Favorites section on the main feed
- **My Food** section with:
  - An "Add New Recipe" form (name, image upload, ingredients, instructions,
    Save button)
  - A "My Recipes" list showing everything you've added
  - Edit and Delete buttons on each of your recipes
- Native back button navigation throughout, powered by React Navigation's
  Stack Navigator

## Tech Stack

- React Native
- Expo
- React Navigation (Native Stack)
- expo-image-picker (for recipe photo uploads)
- React Context API for state management (favorites, user recipes)

## Running the App

### Option 1: Snack Expo (recommended for quick preview)

1. Go to https://snack.expo.dev
2. Choose "Import Git Repository"
3. Paste this repository's URL
4. Preview instantly in the browser, or scan the QR code with the Expo Go
   app on your phone

### Option 2: Locally

```bash
npm install
npx expo start
```

Then scan the QR code with the Expo Go app, or press `w` to open in a
browser.

## Project Structure

```
App.js
context/
  RecipeContext.js
data/
  recipes.js
components/
  RecipeCard.js
  CategoryPill.js
screens/
  HomeScreen.js
  CategoryScreen.js
  RecipeDetailScreen.js
  MyFoodScreen.js
  AddRecipeScreen.js
  EditRecipeScreen.js
```

## Author

Syed Muhammad Shahid
