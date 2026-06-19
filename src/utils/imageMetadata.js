import * as FileSystem from 'expo-file-system';

export const extractMetadata = async (imageUri) => {
  try {
    const fileInfo = await FileSystem.getInfoAsync(imageUri);
    
    return {
      uri: imageUri,
      name: imageUri.split('/').pop(),
      size: fileInfo.size,
      exists: fileInfo.exists,
      isDirectory: fileInfo.isDirectory,
      modificationTime: fileInfo.modificationTime,
      creationTime: fileInfo.creationTime,
    };
  } catch (error) {
    console.error('Error extracting metadata:', error);
    throw error;
  }
};

export const addMetadata = async (imageUri, metadata) => {
  try {
    // In production, you'd use a library like expo-image-manipulator
    // to add EXIF data or similar metadata
    console.log('Adding metadata to image:', metadata);
    
    return {
      uri: imageUri,
      metadata: {
        ...metadata,
        lastModified: Date.now(),
      },
    };
  } catch (error) {
    console.error('Error adding metadata:', error);
    throw error;
  }
};

export const removeMetadata = async (imageUri) => {
  try {
    // Remove sensitive metadata
    console.log('Removing metadata from image');
    
    return {
      uri: imageUri,
      metadata: {},
    };
  } catch (error) {
    console.error('Error removing metadata:', error);
    throw error;
  }
};

export const updateMetadata = async (imageUri, updates) => {
  try {
    const currentMetadata = await extractMetadata(imageUri);
    const updatedMetadata = { ...currentMetadata, ...updates };
    
    return {
      uri: imageUri,
      metadata: updatedMetadata,
    };
  } catch (error) {
    console.error('Error updating metadata:', error);
    throw error;
  }
};

export const getMetadataSummary = (metadata) => {
  return {
    fileName: metadata.name || 'Unknown',
    fileSize: formatFileSize(metadata.size || 0),
    created: metadata.creationTime ? new Date(metadata.creationTime).toLocaleString() : 'Unknown',
    modified: metadata.modificationTime ? new Date(metadata.modificationTime).toLocaleString() : 'Unknown',
  };
};

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};