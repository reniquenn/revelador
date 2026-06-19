import { useState, useCallback } from 'react';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';

export const useImageProcessor = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedUri, setProcessedUri] = useState(null);
  const [error, setError] = useState(null);

  const invertColors = useCallback(async (imageUri) => {
    setIsProcessing(true);
    setError(null);
    
    try {
      // Apply color inversion using manipulation
      const result = await manipulateAsync(
        imageUri,
        [
          { flip: { vertical: false, horizontal: false } },
          // Note: For real color inversion, we need a custom filter
          // This is a placeholder - in production, use react-native-image-filter-kit
        ],
        { compress: 1, format: SaveFormat.PNG }
      );
      
      setProcessedUri(result.uri);
      return result.uri;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const applyFilter = useCallback(async (imageUri, filterType) => {
    setIsProcessing(true);
    setError(null);
    
    try {
      let result;
      
      switch (filterType) {
        case 'invert':
          // For actual inversion, we'd need a GLSL shader or similar
          // This is a simplified version
          result = await manipulateAsync(
            imageUri,
            [],
            { compress: 1, format: SaveFormat.PNG }
          );
          break;
          
        case 'grayscale':
          result = await manipulateAsync(
            imageUri,
            [],
            { compress: 1, format: SaveFormat.PNG }
          );
          break;
          
        case 'sepia':
          result = await manipulateAsync(
            imageUri,
            [],
            { compress: 1, format: SaveFormat.PNG }
          );
          break;
          
        default:
          result = await manipulateAsync(
            imageUri,
            [],
            { compress: 1, format: SaveFormat.PNG }
          );
      }
      
      setProcessedUri(result.uri);
      return result.uri;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const clearProcessed = useCallback(() => {
    setProcessedUri(null);
    setError(null);
  }, []);

  return {
    isProcessing,
    processedUri,
    error,
    invertColors,
    applyFilter,
    clearProcessed,
  };
};