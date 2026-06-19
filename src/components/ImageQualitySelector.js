import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { compressWithPreset, QualityPresets } from '../utils/imageQuality';

const ImageQualitySelector = ({ imageUri, onQualitySelected }) => {
  const [selectedPreset, setSelectedPreset] = useState('MEDIUM');
  const [isProcessing, setIsProcessing] = useState(false);

  const presets = Object.keys(QualityPresets);

  const handlePresetSelect = async (preset) => {
    setSelectedPreset(preset);
    setIsProcessing(true);

    try {
      const compressedUri = await compressWithPreset(imageUri, preset);
      if (onQualitySelected) {
        onQualitySelected(compressedUri, preset);
      }
    } catch (error) {
      Alert.alert('Error', `No se pudo procesar la imagen: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const getPresetDescription = (preset) => {
    const config = QualityPresets[preset];
    return `${config.quality * 100}% calidad, ${config.maxWidth}px máximo`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calidad de Imagen</Text>
      
      {presets.map((preset) => (
        <TouchableOpacity
          key={preset}
          style={[
            styles.presetButton,
            selectedPreset === preset && styles.presetButtonActive,
            isProcessing && styles.presetButtonDisabled,
          ]}
          onPress={() => handlePresetSelect(preset)}
          disabled={isProcessing}
        >
          <Text style={styles.presetName}>{preset}</Text>
          <Text style={styles.presetDescription}>
            {getPresetDescription(preset)}
          </Text>
        </TouchableOpacity>
      ))}

      {isProcessing && (
        <Text style={styles.processingText}>Procesando...</Text>
      )}
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
  presetButton: {
    padding: 15,
    backgroundColor: '#333',
    borderRadius: 8,
    marginBottom: 10,
  },
  presetButtonActive: {
    backgroundColor: '#2196F3',
  },
  presetButtonDisabled: {
    opacity: 0.5,
  },
  presetName: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  presetDescription: {
    color: '#ccc',
    fontSize: 12,
  },
  processingText: {
    color: '#2196F3',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default ImageQualitySelector;