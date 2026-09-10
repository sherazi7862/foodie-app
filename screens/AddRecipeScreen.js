import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, Image, ScrollView, StyleSheet, SafeAreaView, Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useRecipes } from '../context/RecipeContext';

export default function AddRecipeScreen({ navigation }) {
  const { addRecipe } = useRecipes();

  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [ingredientsText, setIngredientsText] = useState('');
  const [instructionsText, setInstructionsText] = useState('');

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission needed', 'Please allow photo library access to upload an image.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    if (!name.trim()) {
      Alert.alert('Missing name', 'Please enter a recipe name.');
      return;
    }
    if (!image) {
      Alert.alert('Missing image', 'Please upload an image for your recipe.');
      return;
    }

    const ingredients = ingredientsText.split('\n').map((i) => i.trim()).filter(Boolean);
    const instructions = instructionsText.split('\n').map((i) => i.trim()).filter(Boolean);

    addRecipe({
      name: name.trim(),
      image,
      ingredients,
      instructions,
      prepTime: 'N/A',
      servings: 1,
      calories: 0,
      difficulty: 'Easy',
    });

    navigation.navigate('MyFood');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Add New Recipe</Text>

        <Text style={styles.label}>Recipe Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="e.g. Homemade Lasagna"
        />

        <Text style={styles.label}>Image</Text>
        <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.previewImage} />
          ) : (
            <Text style={styles.imagePickerText}>Tap to upload an image</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.label}>Ingredients (one per line)</Text>
        <TextInput
          style={[styles.input, styles.multiline]}
          value={ingredientsText}
          onChangeText={setIngredientsText}
          placeholder={'2 cups flour\n1 egg\n1 cup milk'}
          multiline
        />

        <Text style={styles.label}>Instructions (one step per line)</Text>
        <TextInput
          style={[styles.input, styles.multiline]}
          value={instructionsText}
          onChangeText={setInstructionsText}
          placeholder={'Mix ingredients\nBake at 350F for 20 minutes'}
          multiline
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Recipe</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#faf9f6' },
  content: { padding: 20, paddingBottom: 50 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#e65100', marginBottom: 20 },
  label: { fontSize: 14, fontWeight: '600', color: '#555', marginBottom: 6, marginTop: 14 },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  multiline: { minHeight: 90, textAlignVertical: 'top' },
  imagePicker: {
    height: 160,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  imagePickerText: { color: '#999' },
  previewImage: { width: '100%', height: '100%' },
  saveButton: {
    backgroundColor: '#e65100',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    marginTop: 28,
  },
  saveButtonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
