import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import ImageProcessor from './assets/ImageProcessor'; // Importamos el componente de procesamiento

export default function App() {
  const [hasPermission, setHasPermission] = useState(false);
  const [photoUri, setPhotoUri] = useState(null);
  const cameraRef = useRef(null);
  const devices = useCameraDevices();
  const device = devices.back;

  // 1. Solicitar Permisos de Cámara
  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermission();
      setHasPermission(cameraPermission === 'authorized');
    })();
  }, []);

  // 2. Función para tomar la foto
  const takePhoto = async () => {
    if (cameraRef.current == null) {
      return;
    }

    try {
      const photo = await cameraRef.current.takePhoto({
        flash: 'off',
      });
      // El 'path' es la URI local de la foto
      setPhotoUri(photo.path); 
    } catch (error) {
      console.error('Error al tomar foto:', error);
      Alert.alert('Error', 'No se pudo tomar la foto.');
    }
  };

  if (device == null || !hasPermission) {
    return (
      <View style={styles.container}>
        <Text style={styles.statusText}>
          {hasPermission ? 'Cargando cámara...' : 'Esperando permisos de cámara...'}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {photoUri ? (
        // Muestra el componente de procesamiento si hay una foto
        <ImageProcessor photoUri={photoUri} onRetake={() => setPhotoUri(null)} />
      ) : (
        // Muestra la vista de la cámara
        <>
          <Camera
            ref={cameraRef}
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}
            photo={true} // Habilitar la captura de fotos
          />
          <TouchableOpacity 
            style={styles.captureButton} 
            onPress={takePhoto}
          >
            <Text style={styles.captureText}>Capturar Negativo</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  statusText: {
    color: 'white',
    textAlign: 'center',
    marginTop: 50,
  },
  captureButton: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 30,
    elevation: 5,
  },
  captureText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});