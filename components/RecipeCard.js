import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRecipes } from '../context/RecipeContext';

export default function RecipeCard({ recipe, onPress }) {
  const { toggleFavorite, isFavorite } = useRecipes();
  const favorited = isFavorite(recipe.id);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <Image source={{ uri: recipe.image }} style={styles.image} />
      <TouchableOpacity
        style={styles.heartButton}
        onPress={(e) => {
          e.stopPropagation();
          toggleFavorite(recipe.id);
        }}
      >
        <Ionicons
          name={favorited ? 'heart' : 'heart-outline'}
          size={22}
          color={favorited ? '#e53935' : '#ffffff'}
        />
      </TouchableOpacity>
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>{recipe.name}</Text>
        <Text style={styles.meta}>{recipe.prepTime} · {recipe.calories} cal</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 170,
    marginRight: 14,
    borderRadius: 14,
    backgroundColor: '#fff',
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: { width: '100%', height: 120 },
  heartButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.35)',
    borderRadius: 20,
    padding: 6,
  },
  info: { padding: 10 },
  name: { fontSize: 15, fontWeight: '600', color: '#333' },
  meta: { fontSize: 12, color: '#888', marginTop: 4 },
});
