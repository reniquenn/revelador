import React, { useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text, Dimensions, Alert, Modal } from 'react-native';
import { Invert } from 'react-native-image-filter-kit';
import ExportOptions from './ExportOptions';
import ImageQualitySelector from './ImageQualitySelector';
import WebOptimizer from './WebOptimizer';
import ImageFormatConverter from './ImageFormatConverter';
import ImageMetadataViewer from './ImageMetadataViewer';
import CompressionAlgorithmSelector from './CompressionAlgorithmSelector';
import ImageLayerEditor from './ImageLayerEditor';
import SpecialEffects from './SpecialEffects';

const { width } = Dimensions.get('window');

const ImageProcessor = ({ photoUri, onRetake, onSave }) => {
  const [isInverted, setIsInverted] = useState(true);
  const [showOriginal, setShowOriginal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showQualityModal, setShowQualityModal] = useState(false);
  const [showWebOptimizerModal, setShowWebOptimizerModal] = useState(false);
  const [showFormatConverterModal, setShowFormatConverterModal] = useState(false);
  const [showMetadataModal, setShowMetadataModal] = useState(false);
  const [showCompressionModal, setShowCompressionModal] = useState(false);
  const [showLayerEditorModal, setShowLayerEditorModal] = useState(false);
  const [showSpecialEffectsModal, setShowSpecialEffectsModal] = useState(false);

  const handleSave = async () => {
    try {
      if (onSave) {
        await onSave(photoUri);
        Alert.alert('Éxito', 'Foto guardada correctamente');
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar la foto');
    }
  };

  const toggleInversion = () => {
    setIsInverted(!isInverted);
  };

  const toggleOriginal = () => {
    setShowOriginal(!showOriginal);
  };

  const handleExport = () => {
    setShowExportModal(true);
  };

  const handleCloseExport = () => {
    setShowExportModal(false);
  };

  const handleQualitySelect = () => {
    setShowQualityModal(true);
  };

  const handleCloseQuality = () => {
    setShowQualityModal(false);
  };

  const handleQualitySelected = (processedUri, preset) => {
    console.log('Quality selected:', preset, processedUri);
    setShowQualityModal(false);
  };

  const handleWebOptimizerSelect = () => {
    setShowWebOptimizerModal(true);
  };

  const handleCloseWebOptimizer = () => {
    setShowWebOptimizerModal(false);
  };

  const handleWebOptimized = (optimizedUri) => {
    console.log('Web optimized:', optimizedUri);
    setShowWebOptimizerModal(false);
  };

  const handleFormatConverterSelect = () => {
    setShowFormatConverterModal(true);
  };

  const handleCloseFormatConverter = () => {
    setShowFormatConverterModal(false);
  };

  const handleFormatConverted = (convertedUri, format) => {
    console.log('Format converted:', format, convertedUri);
    setShowFormatConverterModal(false);
  };

  const handleMetadataSelect = () => {
    setShowMetadataModal(true);
  };

  const handleCloseMetadata = () => {
    setShowMetadataModal(false);
  };

  const handleCompressionSelect = () => {
    setShowCompressionModal(true);
  };

  const handleCloseCompression = () => {
    setShowCompressionModal(false);
  };

  const handleCompressionSelected = (compressedUri, algorithm) => {
    console.log('Compression selected:', algorithm, compressedUri);
    setShowCompressionModal(false);
  };

  const handleLayerEditorSelect = () => {
    setShowLayerEditorModal(true);
  };

  const handleCloseLayerEditor = () => {
    setShowLayerEditorModal(false);
  };

  const handleLayersApplied = (processedUri) => {
    console.log('Layers applied:', processedUri);
    setShowLayerEditorModal(false);
  };

  const handleSpecialEffectsSelect = () => {
    setShowSpecialEffectsModal(true);
  };

  const handleCloseSpecialEffects = () => {
    setShowSpecialEffectsModal(false);
  };

  const handleEffectApplied = (processedUri, effectType, intensity) => {
    console.log('Effect applied:', effectType, intensity, processedUri);
    setShowSpecialEffectsModal(false);
  };

  const renderImage = () => {
    if (showOriginal) {
      return (
        <Image
          source={{ uri: `file://${photoUri}` }}
          style={styles.image}
          resizeMode="contain"
        />
      );
    }

    if (isInverted) {
      return (
        <Invert
          image={
            <Image
              source={{ uri: `file://${photoUri}` }}
              style={styles.image}
              resizeMode="contain"
            />
          }
        />
      );
    }

    return (
      <Image
        source={{ uri: `file://${photoUri}` }}
        style={styles.image}
        resizeMode="contain"
      />
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {showOriginal ? 'Original' : 'Negativo Revelado'}
      </Text>

      <View style={styles.imageContainer}>
        {renderImage()}
      </View>

      <View style={styles.controls}>
        <TouchableOpacity
          style={[styles.button, styles.toggleButton]}
          onPress={toggleInversion}
        >
          <Text style={styles.buttonText}>
            {isInverted ? 'Ver Original' : 'Ver Invertido'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.saveButton]}
          onPress={handleSave}
        >
          <Text style={styles.buttonText}>Guardar Foto</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.exportButton]}
          onPress={handleExport}
        >
          <Text style={styles.buttonText}>Exportar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.qualityButton]}
          onPress={handleQualitySelect}
        >
          <Text style={styles.buttonText}>Calidad</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.webButton]}
          onPress={handleWebOptimizerSelect}
        >
          <Text style={styles.buttonText}>Optimizar Web</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.formatButton]}
          onPress={handleFormatConverterSelect}
        >
          <Text style={styles.buttonText}>Convertir Formato</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.metadataButton]}
          onPress={handleMetadataSelect}
        >
          <Text style={styles.buttonText}>Ver Metadatos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.compressionButton]}
          onPress={handleCompressionSelect}
        >
          <Text style={styles.buttonText}>Comprimir</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.layerButton]}
          onPress={handleLayerEditorSelect}
        >
          <Text style={styles.buttonText}>Capas</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.effectsButton]}
          onPress={handleSpecialEffectsSelect}
        >
          <Text style={styles.buttonText}>Efectos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.retakeButton]}
          onPress={onRetake}
        >
          <Text style={styles.buttonText}>Tomar otra foto</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={showExportModal}
        transparent={true}
        animationType="slide"
        onRequestClose={handleCloseExport}
      >
        <View style={styles.modalContainer}>
          <ExportOptions photoUri={photoUri} onClose={handleCloseExport} />
        </View>
      </Modal>

      <Modal
        visible={showQualityModal}
        transparent={true}
        animationType="slide"
        onRequestClose={handleCloseQuality}
      >
        <View style={styles.modalContainer}>
          <ImageQualitySelector
            imageUri={photoUri}
            onQualitySelected={handleQualitySelected}
          />
        </View>
      </Modal>

      <Modal
        visible={showWebOptimizerModal}
        transparent={true}
        animationType="slide"
        onRequestClose={handleCloseWebOptimizer}
      >
        <View style={styles.modalContainer}>
          <WebOptimizer
            imageUri={photoUri}
            onOptimized={handleWebOptimized}
          />
        </View>
      </Modal>

      <Modal
        visible={showFormatConverterModal}
        transparent={true}
        animationType="slide"
        onRequestClose={handleCloseFormatConverter}
      >
        <View style={styles.modalContainer}>
          <ImageFormatConverter
            imageUri={photoUri}
            onConverted={handleFormatConverted}
          />
        </View>
      </Modal>

      <Modal
        visible={showMetadataModal}
        transparent={true}
        animationType="slide"
        onRequestClose={handleCloseMetadata}
      >
        <View style={styles.modalContainer}>
          <ImageMetadataViewer
            imageUri={photoUri}
            onClose={handleCloseMetadata}
          />
        </View>
      </Modal>

      <Modal
        visible={showCompressionModal}
        transparent={true}
        animationType="slide"
        onRequestClose={handleCloseCompression}
      >
        <View style={styles.modalContainer}>
          <CompressionAlgorithmSelector
            imageUri={photoUri}
            onAlgorithmSelected={handleCompressionSelected}
          />
        </View>
      </Modal>

      <Modal
        visible={showLayerEditorModal}
        transparent={true}
        animationType="slide"
        onRequestClose={handleCloseLayerEditor}
      >
        <View style={styles.modalContainer}>
          <ImageLayerEditor
            imageUri={photoUri}
            onLayersApplied={handleLayersApplied}
          />
        </View>
      </Modal>

      <Modal
        visible={showSpecialEffectsModal}
        transparent={true}
        animationType="slide"
        onRequestClose={handleCloseSpecialEffects}
      >
        <View style={styles.modalContainer}>
          <SpecialEffects
            imageUri={photoUri}
            onEffectApplied={handleEffectApplied}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    padding: 20,
  },
  title: {
    color: 'white',
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  imageContainer: {
    width: width * 0.9,
    height: width * 0.9,
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  controls: {
    width: '100%',
    gap: 10,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  toggleButton: {
    backgroundColor: '#2196F3',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
  },
  retakeButton: {
    backgroundColor: '#f44336',
  },
  exportButton: {
    backgroundColor: '#ff9800',
  },
  qualityButton: {
    backgroundColor: '#9c27b0',
  },
  webButton: {
    backgroundColor: '#00bcd4',
  },
  formatButton: {
    backgroundColor: '#795548',
  },
  metadataButton: {
    backgroundColor: '#607d8b',
  },
  compressionButton: {
    backgroundColor: '#e91e63',
  },
  layerButton: {
    backgroundColor: '#ff5722',
  },
  effectsButton: {
    backgroundColor: '#009688',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default ImageProcessor;