import * as FileSystem from 'expo-file-system';

const CLOUD_API_URL = 'https://api.cloudinary.com/v1_1';

export const uploadToCloud = async (photoUri, cloudName, uploadPreset) => {
  try {
    const formData = new FormData();
    formData.append('file', {
      uri: photoUri,
      type: 'image/jpeg',
      name: 'photo.jpg',
    });
    formData.append('upload_preset', uploadPreset);

    const response = await fetch(`${CLOUD_API_URL}/${cloudName}/image/upload`, {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const result = await response.json();
    
    if (result.error) {
      throw new Error(result.error.message);
    }

    return result.secure_url;
  } catch (error) {
    console.error('Error uploading to cloud:', error);
    throw error;
  }
};

export const downloadFromCloud = async (cloudUrl, localUri) => {
  try {
    const downloadResult = await FileSystem.downloadAsync(cloudUrl, localUri);
    return downloadResult.uri;
  } catch (error) {
    console.error('Error downloading from cloud:', error);
    throw error;
  }
};

export const deleteFromCloud = async (publicId, cloudName, apiKey, apiSecret) => {
  try {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const signature = `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
    
    // In production, you'd use a proper hashing library
    const response = await fetch(`${CLOUD_API_URL}/${cloudName}/image/destroy`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        public_id: publicId,
        timestamp,
        api_key: apiKey,
        signature,
      }),
    });

    const result = await response.json();
    
    if (result.error) {
      throw new Error(result.error.message);
    }

    return true;
  } catch (error) {
    console.error('Error deleting from cloud:', error);
    throw error;
  }
};

export const getCloudUrl = (cloudName, publicId, transformations = '') => {
  return `${CLOUD_API_URL}/${cloudName}/image/upload/${transformations}/${publicId}`;
};

export const backupToCloud = async (photoUri, cloudName, uploadPreset) => {
  try {
    const cloudUrl = await uploadToCloud(photoUri, cloudName, uploadPreset);
    return {
      success: true,
      url: cloudUrl,
      timestamp: Date.now(),
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      timestamp: Date.now(),
    };
  }
};