import { useState, useRef, useEffect } from 'react';
import { Camera, useCameraDevices } from 'react-native-vision-camera';

export const useCamera = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const [photoUri, setPhotoUri] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const cameraRef = useRef(null);
  const devices = useCameraDevices();
  const device = devices.back;

  useEffect(() => {
    requestPermissions();
  }, []);

  const requestPermissions = async () => {
    try {
      const cameraPermission = await Camera.requestCameraPermission();
      setHasPermission(cameraPermission === 'authorized');
    } catch (error) {
      console.error('Error requesting camera permissions:', error);
      setHasPermission(false);
    }
  };

  const takePhoto = async (options = {}) => {
    if (!cameraRef.current) {
      throw new Error('Camera reference not available');
    }

    setIsProcessing(true);
    try {
      const photo = await cameraRef.current.takePhoto({
        flash: options.flash || 'off',
        qualityPrioritization: options.quality || 'quality',
      });
      setPhotoUri(photo.path);
      return photo.path;
    } catch (error) {
      console.error('Error taking photo:', error);
      throw error;
    } finally {
      setIsProcessing(false);
    }
  };

  const clearPhoto = () => {
    setPhotoUri(null);
  };

  return {
    cameraRef,
    device,
    hasPermission,
    isProcessing,
    photoUri,
    takePhoto,
    clearPhoto,
  };
};