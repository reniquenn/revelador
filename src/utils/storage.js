import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

export const savePhotoToGallery = async (photoUri) => {
  try {
    // Request permission to access media library
    const { status } = await MediaLibrary.requestPermissionsAsync();
    
    if (status !== 'granted') {
      throw new Error('Permission to access media library denied');
    }

    // Save the photo to the gallery
    const asset = await MediaLibrary.createAssetAsync(photoUri);
    
    // Create an album if it doesn't exist
    const album = await MediaLibrary.getAlbumAsync('Revelador');
    
    if (!album) {
      await MediaLibrary.createAlbumAsync('Revelador', asset, false);
    } else {
      await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
    }

    return asset.uri;
  } catch (error) {
    console.error('Error saving photo:', error);
    throw error;
  }
};

export const deletePhoto = async (photoUri) => {
  try {
    await FileSystem.deleteAsync(photoUri, { idempotent: true });
    return true;
  } catch (error) {
    console.error('Error deleting photo:', error);
    throw error;
  }
};

export const getPhotoInfo = async (photoUri) => {
  try {
    const fileInfo = await FileSystem.getInfoAsync(photoUri);
    return fileInfo;
  } catch (error) {
    console.error('Error getting photo info:', error);
    throw error;
  }
};

export const copyPhotoToDocuments = async (photoUri, filename) => {
  try {
    const documentsDir = FileSystem.documentDirectory;
    const newUri = `${documentsDir}${filename}`;
    
    await FileSystem.copyAsync({
      from: photoUri,
      to: newUri,
    });
    
    return newUri;
  } catch (error) {
    console.error('Error copying photo:', error);
    throw error;
  }
};