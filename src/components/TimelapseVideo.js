import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { createTimelapseVideo } from '../utils/videoUtils';

const TimelapseVideo = ({ photos, onVideoCreated }) => {
  const [isCreating, setIsCreating] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleCreateVideo = async () => {
    if (photos.length < 2) {
      Alert.alert('Error', 'Se necesitan al menos 2 fotos para crear un video timelapse');
      return;
    }

    setIsCreating(true);
    setProgress(0);

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90));
      }, 100);

      const outputUri = `timelapse_${Date.now()}.mp4`;
      await createTimelapseVideo(
        photos.map(p => p.path),
        outputUri,
        30 // fps
      );

      clearInterval(progressInterval);
      setProgress(100);

      Alert.alert('Éxito', 'Video timelapse creado correctamente');
      if (onVideoCreated) {
        onVideoCreated(outputUri);
      }
    } catch (error) {
      Alert.alert('Error', `No se pudo crear el video: ${error.message}`);
    } finally {
      setIsCreating(false);
      setProgress(0);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Video Timelapse</Text>
      
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          Fotos disponibles: {photos.length}
        </Text>
        <Text style={styles.infoText}>
          Duración estimada: ~{Math.ceil(photos.length / 30)} segundos a 30fps
        </Text>
      </View>

      {isCreating && (
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
          <Text style={styles.progressText}>{progress}%</Text>
        </View>
      )}

      <TouchableOpacity
        style={[styles.button, isCreating && styles.buttonDisabled]}
        onPress={handleCreateVideo}
        disabled={isCreating || photos.length < 2}
      >
        {isCreating ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text style={styles.buttonText}>Crear Video</Text>
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
  infoContainer: {
    marginBottom: 15,
  },
  infoText: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 5,
  },
  progressContainer: {
    marginBottom: 15,
  },
  progressBar: {
    height: 10,
    backgroundColor: '#333',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 5,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
  },
  progressText: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TimelapseVideo;