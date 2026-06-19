import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { extractMetadata, getMetadataSummary } from '../utils/imageMetadata';

const ImageMetadataViewer = ({ imageUri, onClose }) => {
  const [metadata, setMetadata] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadMetadata();
  }, [imageUri]);

  const loadMetadata = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const extractedMetadata = await extractMetadata(imageUri);
      setMetadata(extractedMetadata);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const renderMetadata = () => {
    if (!metadata) return null;

    const summary = getMetadataSummary(metadata);

    return (
      <View style={styles.metadataContainer}>
        <View style={styles.metadataRow}>
          <Text style={styles.metadataLabel}>Nombre:</Text>
          <Text style={styles.metadataValue}>{summary.fileName}</Text>
        </View>

        <View style={styles.metadataRow}>
          <Text style={styles.metadataLabel}>Tamaño:</Text>
          <Text style={styles.metadataValue}>{summary.fileSize}</Text>
        </View>

        <View style={styles.metadataRow}>
          <Text style={styles.metadataLabel}>Creado:</Text>
          <Text style={styles.metadataValue}>{summary.created}</Text>
        </View>

        <View style={styles.metadataRow}>
          <Text style={styles.metadataLabel}>Modificado:</Text>
          <Text style={styles.metadataValue}>{summary.modified}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Metadatos de Imagen</Text>

      {isLoading ? (
        <ActivityIndicator size="large" color="#2196F3" style={styles.loader} />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        renderMetadata()
      )}

      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeButtonText}>Cerrar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    padding: 20,
    borderRadius: 10,
    margin: 10,
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  loader: {
    marginVertical: 20,
  },
  errorText: {
    color: '#f44336',
    textAlign: 'center',
    marginBottom: 20,
  },
  metadataContainer: {
    marginBottom: 20,
  },
  metadataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  metadataLabel: {
    color: '#ccc',
    fontSize: 14,
  },
  metadataValue: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ImageMetadataViewer;