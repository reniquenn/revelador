import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';

export const QualityPresets = {
  LOW: { quality: 0.3, maxWidth: 800 },
  MEDIUM: { quality: 0.6, maxWidth: 1200 },
  HIGH: { quality: 0.8, maxWidth: 1920 },
  VERY_HIGH: { quality: 0.95, maxWidth: 2560 },
  MAX: { quality: 1, maxWidth: 3840 },
};

export const compressWithPreset = async (uri, preset = 'MEDIUM') => {
  const config = QualityPresets[preset] || QualityPresets.MEDIUM;
  
  try {
    const result = await manipulateAsync(
      uri,
      [{ resize: { width: config.maxWidth } }],
      { compress: config.quality, format: SaveFormat.JPEG }
    );
    
    return result.uri;
  } catch (error) {
    console.error('Error compressing image:', error);
    throw error;
  }
};

export const getQualityInfo = async (uri) => {
  try {
    const result = await manipulateAsync(
      uri,
      [],
      { compress: 1, format: SaveFormat.PNG }
    );
    
    return {
      originalUri: uri,
      processedUri: result.uri,
      width: result.width,
      height: result.height,
    };
  } catch (error) {
    console.error('Error getting quality info:', error);
    throw error;
  }
};

export const compareQuality = async (uri, preset1 = 'LOW', preset2 = 'HIGH') => {
  try {
    const result1 = await compressWithPreset(uri, preset1);
    const result2 = await compressWithPreset(uri, preset2);
    
    return {
      low: result1,
      high: result2,
    };
  } catch (error) {
    console.error('Error comparing quality:', error);
    throw error;
  }
};

export const getRecommendedPreset = (useCase) => {
  switch (useCase) {
    case 'thumbnail':
      return 'LOW';
    case 'social_media':
      return 'MEDIUM';
    case 'print':
      return 'HIGH';
    case 'archive':
      return 'VERY_HIGH';
    case 'original':
      return 'MAX';
    default:
      return 'MEDIUM';
  }
};