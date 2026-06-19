import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { getCacheSize, clearImageCache, formatCacheSize } from '../utils/imageCache';

const CacheInfo = () => {
  const [cacheSize, setCacheSize] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadCacheSize();
  }, []);

  const loadCacheSize = async () => {
    try {
      const size = await getCacheSize();
      setCacheSize(size);
    } catch (error) {
      console.error('Error loading cache size:', error);
    }
  };

  const handleClearCache = async () => {
    setIsLoading(true);
    try {
      await clearImageCache();
      await loadCacheSize();
    } catch (error) {
      console.error('Error clearing cache:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Caché de Imágenes</Text>
      <Text style={styles.size}>Tamaño: {formatCacheSize(cacheSize)}</Text>
      
      <TouchableOpacity
        style={[styles.button, isLoading && styles.buttonDisabled]}
        onPress={handleClearCache}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>
          {isLoading ? 'Limpiando...' : 'Limpiar Caché'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 15,
    borderRadius: 10,
    margin: 10,
  },
  title: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  size: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default CacheInfo;