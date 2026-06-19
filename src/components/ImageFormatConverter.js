import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { convertFormat, SupportedFormats } from '../utils/imageFormats';

const ImageFormatConverter = ({ imageUri, onConverted }) => {
  const [isConverting, setIsConverting] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState('JPEG');

  const formats = Object.keys(SupportedFormats);

  const handleConvert = async () => {
    setIsConverting(true);

    try {
      const convertedUri = await convertFormat(imageUri, selectedFormat, 0.9);
      Alert.alert('Éxito', `Imagen convertida a ${selectedFormat}`);
      if (onConverted) {
        onConverted(convertedUri, selectedFormat);
      }
    } catch (error) {
      Alert.alert('Error', `No se pudo convertir: ${error.message}`);
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Convertir Formato</Text>

      <View style={styles.formatsContainer}>
        {formats.map((format) => (
          <TouchableOpacity
            key={format}
            style={[
              styles.formatButton,
              selectedFormat === format && styles.formatButtonActive,
            ]}
            onPress={() => setSelectedFormat(format)}
          >
            <Text style={styles.formatText}>{format}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.convertButton, isConverting && styles.convertButtonDisabled]}
        onPress={handleConvert}
        disabled={isConverting}
      >
        {isConverting ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text style={styles.convertButtonText}>Convertir</Text>
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
  formatsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  formatButton: {
    padding: 15,
    backgroundColor: '#333',
    borderRadius: 8,
    minWidth: 80,
    alignItems: 'center',
  },
  formatButtonActive: {
    backgroundColor: '#2196F3',
  },
  formatText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  convertButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  convertButtonDisabled: {
    opacity: 0.5,
  },
  convertButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ImageFormatConverter;