import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { createLayer, applyLayers, LayerTypes } from '../utils/imageLayers';

const ImageLayerEditor = ({ imageUri, onLayersApplied }) => {
  const [layers, setLayers] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const addLayer = (type) => {
    const newLayer = createLayer(type, {
      // Default options based on type
    });
    setLayers(prev => [...prev, newLayer]);
  };

  const removeLayer = (layerId) => {
    setLayers(prev => prev.filter(layer => layer.id !== layerId));
  };

  const toggleLayerVisibility = (layerId) => {
    setLayers(prev => prev.map(layer => 
      layer.id === layerId 
        ? { ...layer, visible: !layer.visible }
        : layer
    ));
  };

  const updateLayerOpacity = (layerId, opacity) => {
    setLayers(prev => prev.map(layer => 
      layer.id === layerId 
        ? { ...layer, opacity }
        : layer
    ));
  };

  const handleApplyLayers = async () => {
    if (layers.length === 0) {
      Alert.alert('Error', 'Agrega al menos una capa');
      return;
    }

    setIsProcessing(true);
    try {
      const resultUri = await applyLayers(imageUri, layers);
      Alert.alert('Éxito', 'Capas aplicadas correctamente');
      if (onLayersApplied) {
        onLayersApplied(resultUri);
      }
    } catch (error) {
      Alert.alert('Error', `No se pudieron aplicar las capas: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const renderLayerItem = (layer) => (
    <View key={layer.id} style={styles.layerItem}>
      <View style={styles.layerInfo}>
        <Text style={styles.layerType}>{layer.type.toUpperCase()}</Text>
        <Text style={styles.layerId}>ID: {layer.id}</Text>
      </View>
      
      <View style={styles.layerControls}>
        <TouchableOpacity
          style={[styles.visibilityButton, !layer.visible && styles.visibilityButtonHidden]}
          onPress={() => toggleLayerVisibility(layer.id)}
        >
          <Text style={styles.visibilityButtonText}>
            {layer.visible ? '👁️' : '👁️‍🗨️'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => removeLayer(layer.id)}
        >
          <Text style={styles.removeButtonText}>×</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editor de Capas</Text>

      <View style={styles.addLayerContainer}>
        <Text style={styles.sectionTitle}>Agregar Capa:</Text>
        <View style={styles.addLayerButtons}>
          {Object.values(LayerTypes).map((type) => (
            <TouchableOpacity
              key={type}
              style={styles.addLayerButton}
              onPress={() => addLayer(type)}
            >
              <Text style={styles.addLayerButtonText}>{type}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.layersContainer}>
        <Text style={styles.sectionTitle}>Capas ({layers.length}):</Text>
        <ScrollView style={styles.layersList}>
          {layers.map(renderLayerItem)}
        </ScrollView>
      </View>

      <TouchableOpacity
        style={[styles.applyButton, isProcessing && styles.applyButtonDisabled]}
        onPress={handleApplyLayers}
        disabled={isProcessing}
      >
        <Text style={styles.applyButtonText}>
          {isProcessing ? 'Procesando...' : 'Aplicar Capas'}
        </Text>
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
  sectionTitle: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 10,
  },
  addLayerContainer: {
    marginBottom: 20,
  },
  addLayerButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  addLayerButton: {
    padding: 10,
    backgroundColor: '#333',
    borderRadius: 5,
  },
  addLayerButtonText: {
    color: 'white',
    fontSize: 12,
  },
  layersContainer: {
    marginBottom: 20,
  },
  layersList: {
    maxHeight: 200,
  },
  layerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#222',
    borderRadius: 5,
    marginBottom: 5,
  },
  layerInfo: {
    flex: 1,
  },
  layerType: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  layerId: {
    color: '#ccc',
    fontSize: 12,
  },
  layerControls: {
    flexDirection: 'row',
    gap: 10,
  },
  visibilityButton: {
    padding: 5,
  },
  visibilityButtonHidden: {
    opacity: 0.5,
  },
  visibilityButtonText: {
    fontSize: 16,
  },
  removeButton: {
    padding: 5,
    backgroundColor: '#f44336',
    borderRadius: 5,
  },
  removeButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  applyButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  applyButtonDisabled: {
    opacity: 0.5,
  },
  applyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ImageLayerEditor;