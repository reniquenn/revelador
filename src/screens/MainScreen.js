import React, { useState } from 'react';
import { View, StyleSheet, Alert, Button, ScrollView } from 'react-native';
import { useCamera } from '../hooks/useCamera';
import { useTimelapse } from '../hooks/useTimelapse';
import { useImageProcessor } from '../hooks/useImageProcessor';
import { useScheduledCapture } from '../hooks/useScheduledCapture';
import CameraView from '../components/CameraView';
import ImageProcessor from '../components/ImageProcessor';
import TimelapseControls from '../components/TimelapseControls';
import ScheduledCapture from '../components/ScheduledCapture';
import PhotoGallery from '../components/PhotoGallery';
import CaptureStats from '../components/CaptureStats';
import CaptureHistory from '../components/CaptureHistory';
import TimelapseVideo from '../components/TimelapseVideo';
import AppSettings from '../components/AppSettings';

const MainScreen = () => {
  const [view, setView] = useState('camera'); // 'camera', 'processor', 'gallery', 'scheduled', 'settings', 'history', 'video'
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [appSettings, setAppSettings] = useState(null);
  const [captureHistory, setCaptureHistory] = useState([]);
  const [createdVideoUri, setCreatedVideoUri] = useState(null);

  const {
    cameraRef,
    device,
    hasPermission,
    isProcessing: isCameraProcessing,
    photoUri,
    takePhoto,
    clearPhoto,
  } = useCamera();

  const {
    isCapturing,
    interval,
    capturedPhotos,
    error: timelapseError,
    startTimelapse,
    stopTimelapse,
    clearPhotos,
    updateInterval,
  } = useTimelapse(takePhoto);

  const {
    isProcessing: isImageProcessing,
    invertColors,
    clearProcessed,
  } = useImageProcessor();

  const {
    isScheduled,
    scheduleConfig,
    capturedCount,
    startSchedule,
    stopSchedule,
    resetCount,
  } = useScheduledCapture(takePhoto);

  const handleTakePhoto = async () => {
    try {
      await takePhoto();
      setView('processor');
    } catch (error) {
      Alert.alert('Error', 'No se pudo tomar la foto');
    }
  };

  const handleRetake = () => {
    clearPhoto();
    clearProcessed();
    setView('camera');
  };

  const handleSavePhoto = async (uri) => {
    // TODO: Implement actual save functionality
    console.log('Saving photo:', uri);
  };

  const handleSelectPhoto = (photo) => {
    setSelectedPhoto(photo);
    setView('processor');
  };

  const handleDeletePhoto = (photo) => {
    Alert.alert(
      'Confirmar',
      '¿Estás seguro de que quieres eliminar esta foto?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            // TODO: Implement actual delete functionality
            console.log('Deleting photo:', photo);
          },
        },
      ]
    );
  };

  const handleStartTimelapse = (intervalMs) => {
    startTimelapse(intervalMs);
    Alert.alert('Timelapse Iniciado', `Capturando cada ${intervalMs / 1000} segundos`);
  };

  const handleStopTimelapse = () => {
    stopTimelapse();
    Alert.alert('Timelapse Detenido', `Se capturaron ${capturedPhotos.length} fotos`);
  };

  const handleStartSchedule = (config) => {
    startSchedule(config);
  };

  const handleStopSchedule = () => {
    stopSchedule();
    Alert.alert('Programación Detenida', `Se capturaron ${capturedCount} fotos programadas`);
  };

  const handleSaveSettings = (newSettings) => {
    setAppSettings(newSettings);
    setView('camera');
  };

  const handleCancelSettings = () => {
    setView('camera');
  };

  const handleSelectHistoryCapture = (capture) => {
    setSelectedPhoto(capture);
    setView('processor');
  };

  const handleDeleteHistoryCapture = (capture) => {
    Alert.alert(
      'Confirmar',
      '¿Estás seguro de que quieres eliminar esta captura?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            setCaptureHistory(prev => prev.filter(item => item.timestamp !== capture.timestamp));
          },
        },
      ]
    );
  };

  const handleVideoCreated = (videoUri) => {
    setCreatedVideoUri(videoUri);
    Alert.alert('Éxito', 'Video timelapse creado correctamente');
  };

  if (view === 'video') {
    return (
      <View style={styles.container}>
        <TimelapseVideo
          photos={capturedPhotos}
          onVideoCreated={handleVideoCreated}
        />
        <View style={styles.videoButton}>
          <Button
            title="Volver a la cámara"
            onPress={() => setView('camera')}
          />
        </View>
      </View>
    );
  }

  if (view === 'history') {
    return (
      <View style={styles.container}>
        <CaptureHistory
          captures={captureHistory}
          onSelectCapture={handleSelectHistoryCapture}
          onDeleteCapture={handleDeleteHistoryCapture}
        />
        <View style={styles.historyButton}>
          <Button
            title="Volver a la cámara"
            onPress={() => setView('camera')}
          />
        </View>
      </View>
    );
  }

  if (view === 'settings') {
    return (
      <View style={styles.container}>
        <AppSettings
          onSave={handleSaveSettings}
          onCancel={handleCancelSettings}
        />
      </View>
    );
  }

  if (view === 'processor' && (photoUri || selectedPhoto)) {
    return (
      <View style={styles.container}>
        <ImageProcessor
          photoUri={selectedPhoto?.path || photoUri}
          onRetake={handleRetake}
          onSave={handleSavePhoto}
        />
      </View>
    );
  }

  if (view === 'gallery') {
    return (
      <View style={styles.container}>
        <PhotoGallery
          photos={capturedPhotos}
          onSelectPhoto={handleSelectPhoto}
          onDeletePhoto={handleDeletePhoto}
        />
      </View>
    );
  }

  if (view === 'scheduled') {
    return (
      <ScrollView style={styles.container}>
        <ScheduledCapture
          onStartSchedule={handleStartSchedule}
          onStopSchedule={handleStopSchedule}
        />
        
        <View style={styles.scheduleInfo}>
          <Button
            title="Volver a la cámara"
            onPress={() => setView('camera')}
          />
        </View>
      </ScrollView>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        cameraRef={cameraRef}
        device={device}
        hasPermission={hasPermission}
        isProcessing={isCameraProcessing}
        onTakePhoto={handleTakePhoto}
      />

      <View style={styles.bottomControls}>
        <TimelapseControls
          isCapturing={isCapturing}
          interval={interval}
          capturedCount={capturedPhotos.length}
          onStart={handleStartTimelapse}
          onStop={handleStopTimelapse}
          onUpdateInterval={updateInterval}
        />

        <View style={styles.buttonRow}>
          {capturedPhotos.length > 0 && (
            <View style={styles.buttonContainer}>
              <Button
                title={`Ver Galería (${capturedPhotos.length})`}
                onPress={() => setView('gallery')}
              />
            </View>
          )}
          
          <View style={styles.buttonContainer}>
            <Button
              title="Captura Programada"
              onPress={() => setView('scheduled')}
            />
          </View>

          <View style={styles.buttonContainer}>
            <Button
              title="Configuración"
              onPress={() => setView('settings')}
            />
          </View>

          <View style={styles.buttonContainer}>
            <Button
              title="Historial"
              onPress={() => setView('history')}
            />
          </View>

          <View style={styles.buttonContainer}>
            <Button
              title="Crear Video"
              onPress={() => setView('video')}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  bottomControls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  buttonContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
  scheduleInfo: {
    padding: 20,
  },
  historyButton: {
    padding: 10,
  },
  videoButton: {
    padding: 10,
  },
});

export default MainScreen;