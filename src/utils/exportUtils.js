import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';

export const exportToGallery = async (photoUri) => {
  try {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    
    if (status !== 'granted') {
      throw new Error('Permission to access media library denied');
    }

    const asset = await MediaLibrary.createAssetAsync(photoUri);
    return asset.uri;
  } catch (error) {
    console.error('Error exporting to gallery:', error);
    throw error;
  }
};

export const sharePhoto = async (photoUri) => {
  try {
    const isAvailable = await Sharing.isAvailableAsync();
    
    if (!isAvailable) {
      throw new Error('Sharing is not available on this device');
    }

    await Sharing.shareAsync(photoUri, {
      mimeType: 'image/jpeg',
      dialogTitle: 'Compartir foto',
    });
    
    return true;
  } catch (error) {
    console.error('Error sharing photo:', error);
    throw error;
  }
};

export const createBackup = async (photoUri, backupName) => {
  try {
    const documentsDir = FileSystem.documentDirectory;
    const backupDir = `${documentsDir}backups/`;
    
    // Create backup directory if it doesn't exist
    const dirInfo = await FileSystem.getInfoAsync(backupDir);
    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(backupDir, { intermediates: true });
    }

    const backupUri = `${backupDir}${backupName}`;
    await FileSystem.copyAsync({
      from: photoUri,
      to: backupUri,
    });

    return backupUri;
  } catch (error) {
    console.error('Error creating backup:', error);
    throw error;
  }
};

export const exportToDocuments = async (photoUri, filename) => {
  try {
    const documentsDir = FileSystem.documentDirectory;
    const exportUri = `${documentsDir}${filename}`;
    
    await FileSystem.copyAsync({
      from: photoUri,
      to: exportUri,
    });

    return exportUri;
  } catch (error) {
    console.error('Error exporting to documents:', error);
    throw error;
  }
};

export const getExportOptions = () => [
  { id: 'gallery', label: 'Guardar en Galería', icon: '🖼️' },
  { id: 'share', label: 'Compartir', icon: '📤' },
  { id: 'backup', label: 'Crear Copia de Seguridad', icon: '💾' },
  { id: 'documents', label: 'Exportar a Documentos', icon: '📁' },
];