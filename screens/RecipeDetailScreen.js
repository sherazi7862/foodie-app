import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRecipes } from '../context/RecipeContext';

export default function RecipeDetailScreen({ route }) {
  const { recipeId } = route.params;
  const { getRecipeById, toggleFavorite, isFavorite } = useRecipes();
  const recipe = getRecipeById(recipeId);

  if (!recipe) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.emptyText}>Recipe not found.</Text>
      </SafeAreaView>
    );
  }

  const favorited = isFavorite(recipe.id);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Image source={{ uri: recipe.image }} style={styles.image} />

        <TouchableOpacity style={styles.heartButton} onPress={() => toggleFavorite(recipe.id)}>
          <Ionicons name={favorited ? 'heart' : 'heart-outline'} size={28} color={favorited ? '#e53935' : '#fff'} />
        </TouchableOpacity>

        <View style={styles.content}>
          <Text style={styles.name}>{recipe.name}</Text>

          {/* Quick stats: prep time, servings, calories, difficulty */}
          <View style={styles.statsRow}>
            <Stat label="Prep Time" value={recipe.prepTime} />
            <Stat label="Servings" value={recipe.servings} />
            <Stat label="Calories" value={`${recipe.calories} cal`} />
            <Stat label="Difficulty" value={recipe.difficulty} />
          </View>

          <Text style={styles.sectionTitle}>Ingredients</Text>
          {recipe.ingredients.map((ing, idx) => (
            <Text key={idx} style={styles.listItem}>• {ing}</Text>
          ))}

          <Text style={styles.sectionTitle}>Instructions</Text>
          {recipe.instructions.map((step, idx) => (
            <Text key={idx} style={styles.listItem}>{idx + 1}. {step}</Text>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Stat({ label, value }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  image: { width: '100%', height: 260 },
  heartButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 24,
    padding: 8,
  },
  content: { padding: 20 },
  name: { fontSize: 26, fontWeight: 'bold', color: '#333', marginBottom: 12 },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff3e0',
    borderRadius: 12,
    padding: 12,
    marginBottom: 20,
  },
  stat: { alignItems: 'center', flex: 1 },
  statValue: { fontWeight: '700', color: '#e65100', fontSize: 14 },
  statLabel: { fontSize: 11, color: '#888', marginTop: 2 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginTop: 10, marginBottom: 10, color: '#333' },
  listItem: { fontSize: 15, color: '#444', marginBottom: 6, lineHeight: 22 },
  emptyText: { textAlign: 'center', marginTop: 40, color: '#888' },
});
