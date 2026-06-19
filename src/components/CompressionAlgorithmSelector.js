import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { compressWithAlgorithm, CompressionAlgorithms } from '../utils/compressionAlgorithms';

const CompressionAlgorithmSelector = ({ imageUri, onAlgorithmSelected }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('jpeg');

  const algorithms = Object.values(CompressionAlgorithms);

  const handleAlgorithmSelect = async (algorithm) => {
    setSelectedAlgorithm(algorithm);
    setIsProcessing(true);

    try {
      const compressedUri = await compressWithAlgorithm(imageUri, algorithm, 0.8);
      if (onAlgorithmSelected) {
        onAlgorithmSelected(compressedUri, algorithm);
      }
    } catch (error) {
      Alert.alert('Error', `No se pudo comprimir: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const getAlgorithmDescription = (algorithm) => {
    const descriptions = {
      jpeg: 'Compresión con pérdida, ideal para fotos',
      png: 'Sin pérdida, ideal para gráficos',
      webp: 'Moderno, mejor compresión que JPEG',
      heif: 'Alta eficiencia, usado en iOS',
    };
    return descriptions[algorithm] || algorithm;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Algoritmo de Compresión</Text>

      {algorithms.map((algorithm) => (
        <TouchableOpacity
          key={algorithm}
          style={[
            styles.algorithmButton,
            selectedAlgorithm === algorithm && styles.algorithmButtonActive,
            isProcessing && styles.algorithmButtonDisabled,
          ]}
          onPress={() => handleAlgorithmSelect(algorithm)}
          disabled={isProcessing}
        >
          <Text style={styles.algorithmName}>{algorithm.toUpperCase()}</Text>
          <Text style={styles.algorithmDescription}>
            {getAlgorithmDescription(algorithm)}
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
  algorithmButton: {
    padding: 15,
    backgroundColor: '#333',
    borderRadius: 8,
    marginBottom: 10,
  },
  algorithmButtonActive: {
    backgroundColor: '#2196F3',
  },
  algorithmButtonDisabled: {
    opacity: 0.5,
  },
  algorithmName: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  algorithmDescription: {
    color: '#ccc',
    fontSize: 12,
  },
  processingText: {
    color: '#2196F3',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default CompressionAlgorithmSelector;