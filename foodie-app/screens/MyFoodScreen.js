import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRecipes } from '../context/RecipeContext';

export default function MyFoodScreen({ navigation }) {
  const { myRecipes, deleteRecipe } = useRecipes();

  const confirmDelete = (recipe) => {
    Alert.alert('Delete Recipe', `Delete "${recipe.name}"?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => deleteRecipe(recipe.id) },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>My Food</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddRecipe')}>
          <Ionicons name="add-circle" size={20} color="#fff" />
          <Text style={styles.addButtonText}>Add New Recipe</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.subtitle}>My Recipes</Text>

      <FlatList
        data={myRecipes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.emptyText}>You haven't added any recipes yet. Tap "Add New Recipe" to get started.</Text>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.recipeRow}
            onPress={() => navigation.navigate('RecipeDetail', { recipeId: item.id })}
          >
            <Image source={{ uri: item.image }} style={styles.thumbnail} />
            <View style={styles.recipeInfo}>
              <Text style={styles.recipeName}>{item.name}</Text>
              <Text style={styles.recipeMeta}>{item.ingredients.length} ingredients</Text>
            </View>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => navigation.navigate('EditRecipe', { recipeId: item.id })}
            >
              <Ionicons name="pencil" size={18} color="#1976d2" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={() => confirmDelete(item)}>
              <Ionicons name="trash" size={18} color="#e53935" />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#faf9f6' },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#e65100' },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e65100',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  addButtonText: { color: '#fff', fontWeight: '600', fontSize: 13 },
  subtitle: { fontSize: 16, fontWeight: '600', paddingHorizontal: 16, color: '#555', marginBottom: 6 },
  list: { paddingHorizontal: 16, paddingBottom: 30 },
  recipeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
    elevation: 2,
  },
  thumbnail: { width: 56, height: 56, borderRadius: 8 },
  recipeInfo: { flex: 1, marginLeft: 12 },
  recipeName: { fontSize: 15, fontWeight: '600', color: '#333' },
  recipeMeta: { fontSize: 12, color: '#888', marginTop: 2 },
  iconButton: { padding: 8 },
  emptyText: { textAlign: 'center', marginTop: 30, color: '#888', paddingHorizontal: 20 },
});
