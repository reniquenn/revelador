import * as FileSystem from 'expo-file-system';

export const createDirectory = async (dirPath) => {
  try {
    const dirInfo = await FileSystem.getInfoAsync(dirPath);
    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(dirPath, { intermediates: true });
    }
    return true;
  } catch (error) {
    console.error('Error creating directory:', error);
    throw error;
  }
};

export const listFiles = async (dirPath) => {
  try {
    const result = await FileSystem.readDirectoryAsync(dirPath);
    return result;
  } catch (error) {
    console.error('Error listing files:', error);
    throw error;
  }
};

export const getFileInfo = async (filePath) => {
  try {
    const fileInfo = await FileSystem.getInfoAsync(filePath);
    return fileInfo;
  } catch (error) {
    console.error('Error getting file info:', error);
    throw error;
  }
};

export const deleteFile = async (filePath) => {
  try {
    await FileSystem.deleteAsync(filePath, { idempotent: true });
    return true;
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
};

export const copyFile = async (sourcePath, destinationPath) => {
  try {
    await FileSystem.copyAsync({
      from: sourcePath,
      to: destinationPath,
    });
    return destinationPath;
  } catch (error) {
    console.error('Error copying file:', error);
    throw error;
  }
};

export const moveFile = async (sourcePath, destinationPath) => {
  try {
    await FileSystem.moveAsync({
      from: sourcePath,
      to: destinationPath,
    });
    return destinationPath;
  } catch (error) {
    console.error('Error moving file:', error);
    throw error;
  }
};

export const readAsString = async (filePath) => {
  try {
    const content = await FileSystem.readAsStringAsync(filePath);
    return content;
  } catch (error) {
    console.error('Error reading file:', error);
    throw error;
  }
};

export const writeAsString = async (filePath, content) => {
  try {
    await FileSystem.writeAsStringAsync(filePath, content);
    return true;
  } catch (error) {
    console.error('Error writing file:', error);
    throw error;
  }
};

export const getFileSize = async (filePath) => {
  try {
    const fileInfo = await FileSystem.getInfoAsync(filePath);
    return fileInfo.size;
  } catch (error) {
    console.error('Error getting file size:', error);
    throw error;
  }
};

export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};