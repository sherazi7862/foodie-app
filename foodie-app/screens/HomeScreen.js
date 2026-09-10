import React from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { categories } from '../data/recipes';
import { useRecipes } from '../context/RecipeContext';
import CategoryPill from '../components/CategoryPill';
import RecipeCard from '../components/RecipeCard';

export default function HomeScreen({ navigation }) {
  const { recipes } = useRecipes();

  const goToCategory = (category) => {
    if (category === 'My Food') {
      navigation.navigate('MyFood');
    } else {
      navigation.navigate('Category', { category });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Foodie 🍽️</Text>

      {/* Categories bar - horizontally scrollable, includes "My Food" */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesRow}>
        <CategoryPill label="My Food" onPress={() => goToCategory('My Food')} />
        {categories.map((cat) => (
          <CategoryPill key={cat} label={cat} onPress={() => goToCategory(cat)} />
        ))}
      </ScrollView>

      <ScrollView contentContainerStyle={styles.feedContent}>
        <Text style={styles.sectionTitle}>All Recipes</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onPress={() => navigation.navigate('RecipeDetail', { recipeId: recipe.id })}
            />
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>Favorites</Text>
        <FavoritesPreview navigation={navigation} />
      </ScrollView>
    </SafeAreaView>
  );
}

function FavoritesPreview({ navigation }) {
  const { favoriteRecipes } = useRecipes();

  if (favoriteRecipes.length === 0) {
    return <Text style={styles.emptyText}>No favorites yet. Tap the heart on a recipe!</Text>;
  }

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {favoriteRecipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          onPress={() => navigation.navigate('RecipeDetail', { recipeId: recipe.id })}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#faf9f6' },
  header: { fontSize: 26, fontWeight: 'bold', paddingHorizontal: 16, paddingTop: 12, color: '#e65100' },
  categoriesRow: { paddingHorizontal: 16, marginTop: 12, marginBottom: 8, flexGrow: 0 },
  feedContent: { paddingHorizontal: 16, paddingBottom: 40 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginTop: 16, marginBottom: 10, color: '#333' },
  emptyText: { color: '#888', fontStyle: 'italic', marginBottom: 10 },
});
