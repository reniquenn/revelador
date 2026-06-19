import * as VideoThumbnails from 'expo-video-thumbnails';
import * as FileSystem from 'expo-file-system';

export const generateThumbnail = async (videoUri, timeMs = 0) => {
  try {
    const { uri } = await VideoThumbnails.getThumbnailAsync(videoUri, {
      time: timeMs,
      quality: 0.7,
    });
    return uri;
  } catch (error) {
    console.error('Error generating thumbnail:', error);
    throw error;
  }
};

export const getVideoInfo = async (videoUri) => {
  try {
    const fileInfo = await FileSystem.getInfoAsync(videoUri);
    return {
      uri: videoUri,
      size: fileInfo.size,
      exists: fileInfo.exists,
      isDirectory: fileInfo.isDirectory,
    };
  } catch (error) {
    console.error('Error getting video info:', error);
    throw error;
  }
};

export const formatDuration = (milliseconds) => {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours > 0) {
    return `${hours}:${(minutes % 60).toString().padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;
  }
  return `${minutes}:${(seconds % 60).toString().padStart(2, '0')}`;
};

export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const createTimelapseVideo = async (photoUris, outputUri, fps = 30) => {
  try {
    // This is a placeholder - in production, you'd use a native module
    // like react-native-video-processing or expo-video
    console.log('Creating timelapse video from', photoUris.length, 'photos');
    
    // For now, just copy the first photo as a placeholder
    if (photoUris.length > 0) {
      await FileSystem.copyAsync({
        from: photoUris[0],
        to: outputUri,
      });
    }
    
    return outputUri;
  } catch (error) {
    console.error('Error creating timelapse video:', error);
    throw error;
  }
};

export const compressVideo = async (videoUri, quality = 'medium') => {
  try {
    // This is a placeholder - in production, you'd use a native module
    console.log('Compressing video:', videoUri);
    return videoUri;
  } catch (error) {
    console.error('Error compressing video:', error);
    throw error;
  }
};

export const trimVideo = async (videoUri, startTime, endTime) => {
  try {
    // This is a placeholder - in production, you'd use a native module
    console.log('Trimming video from', startTime, 'to', endTime);
    return videoUri;
  } catch (error) {
    console.error('Error trimming video:', error);
    throw error;
  }
};