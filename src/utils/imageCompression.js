import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';

export const compressImage = async (uri, quality = 0.8, maxWidth = 1920) => {
  try {
    const result = await manipulateAsync(
      uri,
      [{ resize: { width: maxWidth } }],
      { compress: quality, format: SaveFormat.JPEG }
    );
    
    return result.uri;
  } catch (error) {
    console.error('Error compressing image:', error);
    throw error;
  }
};

export const resizeImage = async (uri, width, height) => {
  try {
    const result = await manipulateAsync(
      uri,
      [{ resize: { width, height } }],
      { compress: 1, format: SaveFormat.PNG }
    );
    
    return result.uri;
  } catch (error) {
    console.error('Error resizing image:', error);
    throw error;
  }
};

export const cropImage = async (uri, cropData) => {
  try {
    const result = await manipulateAsync(
      uri,
      [{ crop: cropData }],
      { compress: 1, format: SaveFormat.PNG }
    );
    
    return result.uri;
  } catch (error) {
    console.error('Error cropping image:', error);
    throw error;
  }
};

export const rotateImage = async (uri, rotation) => {
  try {
    const result = await manipulateAsync(
      uri,
      [{ rotate: rotation }],
      { compress: 1, format: SaveFormat.PNG }
    );
    
    return result.uri;
  } catch (error) {
    console.error('Error rotating image:', error);
    throw error;
  }
};

export const flipImage = async (uri, horizontal = true) => {
  try {
    const result = await manipulateAsync(
      uri,
      [{ flip: { horizontal, vertical: false } }],
      { compress: 1, format: SaveFormat.PNG }
    );
    
    return result.uri;
  } catch (error) {
    console.error('Error flipping image:', error);
    throw error;
  }
};

export const applyMultipleOperations = async (uri, operations) => {
  try {
    const result = await manipulateAsync(
      uri,
      operations,
      { compress: 1, format: SaveFormat.PNG }
    );
    
    return result.uri;
  } catch (error) {
    console.error('Error applying operations:', error);
    throw error;
  }
};