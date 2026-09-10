import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RecipeProvider } from './context/RecipeContext';

import HomeScreen from './screens/HomeScreen';
import CategoryScreen from './screens/CategoryScreen';
import RecipeDetailScreen from './screens/RecipeDetailScreen';
import MyFoodScreen from './screens/MyFoodScreen';
import AddRecipeScreen from './screens/AddRecipeScreen';
import EditRecipeScreen from './screens/EditRecipeScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <RecipeProvider>
      <NavigationContainer>
        {/* Native Stack Navigator provides a functional back button
            automatically on every screen except the initial one. */}
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Category" component={CategoryScreen} options={{ title: 'Category' }} />
          <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} options={{ title: 'Recipe' }} />
          <Stack.Screen name="MyFood" component={MyFoodScreen} options={{ title: 'My Food' }} />
          <Stack.Screen name="AddRecipe" component={AddRecipeScreen} options={{ title: 'Add New Recipe' }} />
          <Stack.Screen name="EditRecipe" component={EditRecipeScreen} options={{ title: 'Edit Recipe' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </RecipeProvider>
  );
}
