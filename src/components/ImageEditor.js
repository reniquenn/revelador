import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text, Dimensions, Alert } from 'react-native';
import { Invert, Grayscale, Sepia, Brightness, Contrast } from 'react-native-image-filter-kit';
import { compressImage, rotateImage, flipImage } from '../utils/imageCompression';

const { width } = Dimensions.get('window');

const ImageEditor = ({ imageUri, onSave, onCancel }) => {
  const [currentFilter, setCurrentFilter] = useState('invert');
  const [isProcessing, setIsProcessing] = useState(false);

  const filters = [
    { id: 'invert', name: 'Invertir', component: Invert },
    { id: 'grayscale', name: 'Escala de Grises', component: Grayscale },
    { id: 'sepia', name: 'Sepia', component: Sepia },
  ];

  const handleSave = async () => {
    setIsProcessing(true);
    try {
      // Here you would apply the selected filter and save
      // For now, we'll just compress and save
      const compressedUri = await compressImage(imageUri, 0.9);
      if (onSave) {
        await onSave(compressedUri);
      }
      Alert.alert('Éxito', 'Imagen guardada correctamente');
    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar la imagen');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRotate = async () => {
    try {
      const rotatedUri = await rotateImage(imageUri, 90);
      // Update the image URI state
      console.log('Rotated to:', rotatedUri);
    } catch (error) {
      Alert.alert('Error', 'No se pudo rotar la imagen');
    }
  };

  const handleFlip = async () => {
    try {
      const flippedUri = await flipImage(imageUri, true);
      // Update the image URI state
      console.log('Flipped to:', flippedUri);
    } catch (error) {
      Alert.alert('Error', 'No se pudo invertir la imagen');
    }
  };

  const renderImage = () => {
    const selectedFilter = filters.find(f => f.id === currentFilter);
    
    if (selectedFilter && selectedFilter.component) {
      const FilterComponent = selectedFilter.component;
      return (
        <FilterComponent
          image={
            <Image
              source={{ uri: `file://${imageUri}` }}
              style={styles.image}
              resizeMode="contain"
            />
          }
        />
      );
    }

    return (
      <Image
        source={{ uri: `file://${imageUri}` }}
        style={styles.image}
        resizeMode="contain"
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {renderImage()}
      </View>

      <View style={styles.filtersContainer}>
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.id}
            style={[
              styles.filterButton,
              currentFilter === filter.id && styles.filterButtonActive,
            ]}
            onPress={() => setCurrentFilter(filter.id)}
          >
            <Text style={styles.filterButtonText}>{filter.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.toolsContainer}>
        <TouchableOpacity style={styles.toolButton} onPress={handleRotate}>
          <Text style={styles.toolButtonText}>Rotar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.toolButton} onPress={handleFlip}>
          <Text style={styles.toolButtonText}>Voltear</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.saveButton, isProcessing && styles.saveButtonDisabled]}
          onPress={handleSave}
          disabled={isProcessing}
        >
          <Text style={styles.buttonText}>
            {isProcessing ? 'Guardando...' : 'Guardar'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: width * 0.9,
    height: width * 0.9,
  },
  filtersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  filterButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#333',
  },
  filterButtonActive: {
    backgroundColor: '#2196F3',
  },
  filterButtonText: {
    color: 'white',
    fontSize: 14,
  },
  toolsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  toolButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#4CAF50',
  },
  toolButtonText: {
    color: 'white',
    fontSize: 14,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  cancelButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#f44336',
  },
  saveButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#4CAF50',
  },
  saveButtonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ImageEditor;