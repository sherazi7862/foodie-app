import React from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { useRecipes } from '../context/RecipeContext';
import RecipeCard from '../components/RecipeCard';

export default function CategoryScreen({ route, navigation }) {
  const { category } = route.params;
  const { recipes } = useRecipes();

  const filtered = recipes.filter((r) => r.category === category);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{category}</Text>
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.cardWrapper}>
            <RecipeCard
              recipe={item}
              onPress={() => navigation.navigate('RecipeDetail', { recipeId: item.id })}
            />
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No recipes in this category yet.</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#faf9f6' },
  title: { fontSize: 22, fontWeight: 'bold', padding: 16, color: '#e65100' },
  list: { paddingHorizontal: 12, paddingBottom: 30 },
  cardWrapper: { marginBottom: 14 },
  emptyText: { textAlign: 'center', marginTop: 40, color: '#888' },
});
