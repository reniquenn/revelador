import * as FileSystem from 'expo-file-system';

const CACHE_DIR = `${FileSystem.cacheDirectory}images/`;

export const cacheImage = async (uri, filename) => {
  try {
    // Ensure cache directory exists
    const dirInfo = await FileSystem.getInfoAsync(CACHE_DIR);
    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(CACHE_DIR, { intermediates: true });
    }

    const cacheUri = `${CACHE_DIR}${filename}`;
    
    // Download and cache the image
    const downloadResult = await FileSystem.downloadAsync(uri, cacheUri);
    
    return downloadResult.uri;
  } catch (error) {
    console.error('Error caching image:', error);
    throw error;
  }
};

export const getCachedImage = async (filename) => {
  try {
    const cacheUri = `${CACHE_DIR}${filename}`;
    const fileInfo = await FileSystem.getInfoAsync(cacheUri);
    
    if (fileInfo.exists) {
      return cacheUri;
    }
    
    return null;
  } catch (error) {
    console.error('Error getting cached image:', error);
    throw error;
  }
};

export const clearImageCache = async () => {
  try {
    const dirInfo = await FileSystem.getInfoAsync(CACHE_DIR);
    if (dirInfo.exists) {
      await FileSystem.deleteAsync(CACHE_DIR);
      await FileSystem.makeDirectoryAsync(CACHE_DIR, { intermediates: true });
    }
    return true;
  } catch (error) {
    console.error('Error clearing image cache:', error);
    throw error;
  }
};

export const getCacheSize = async () => {
  try {
    const dirInfo = await FileSystem.getInfoAsync(CACHE_DIR);
    if (!dirInfo.exists) {
      return 0;
    }

    const files = await FileSystem.readDirectoryAsync(CACHE_DIR);
    let totalSize = 0;

    for (const file of files) {
      const fileInfo = await FileSystem.getInfoAsync(`${CACHE_DIR}${file}`);
      totalSize += fileInfo.size;
    }

    return totalSize;
  } catch (error) {
    console.error('Error getting cache size:', error);
    throw error;
  }
};

export const formatCacheSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};