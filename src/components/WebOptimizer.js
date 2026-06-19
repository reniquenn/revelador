import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { optimizeForWeb, createResponsiveImages } from '../utils/webOptimization';

const WebOptimizer = ({ imageUri, onOptimized }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedOption, setSelectedOption] = useState('optimized');

  const options = [
    { id: 'optimized', label: 'Optimizado para Web', description: 'Reduce tamaño y calidad para carga rápida' },
    { id: 'responsive', label: 'Imágenes Responsivas', description: 'Crea múltiples tamaños para diferentes dispositivos' },
    { id: 'thumbnail', label: 'Crear Thumbnail', description: 'Genera una imagen pequeña para vista previa' },
  ];

  const handleOptimize = async () => {
    setIsProcessing(true);

    try {
      let result;

      switch (selectedOption) {
        case 'optimized':
          result = await optimizeForWeb(imageUri, {
            maxWidth: 1200,
            quality: 0.8,
          });
          break;

        case 'responsive':
          result = await createResponsiveImages(imageUri);
          break;

        case 'thumbnail':
          result = await optimizeForWeb(imageUri, {
            maxWidth: 150,
            quality: 0.6,
          });
          break;

        default:
          result = await optimizeForWeb(imageUri);
      }

      Alert.alert('Éxito', 'Imagen optimizada correctamente');
      if (onOptimized) {
        onOptimized(result);
      }
    } catch (error) {
      Alert.alert('Error', `No se pudo optimizar: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Optimizador Web</Text>

      {options.map((option) => (
        <TouchableOpacity
          key={option.id}
          style={[
            styles.optionButton,
            selectedOption === option.id && styles.optionButtonActive,
          ]}
          onPress={() => setSelectedOption(option.id)}
        >
          <Text style={styles.optionLabel}>{option.label}</Text>
          <Text style={styles.optionDescription}>{option.description}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        style={[styles.optimizeButton, isProcessing && styles.optimizeButtonDisabled]}
        onPress={handleOptimize}
        disabled={isProcessing}
      >
        {isProcessing ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text style={styles.optimizeButtonText}>Optimizar</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 20,
    borderRadius: 10,
    margin: 10,
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  optionButton: {
    padding: 15,
    backgroundColor: '#333',
    borderRadius: 8,
    marginBottom: 10,
  },
  optionButtonActive: {
    backgroundColor: '#2196F3',
  },
  optionLabel: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  optionDescription: {
    color: '#ccc',
    fontSize: 12,
  },
  optimizeButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  optimizeButtonDisabled: {
    opacity: 0.5,
  },
  optimizeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WebOptimizer;