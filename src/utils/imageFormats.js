import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';

export const SupportedFormats = {
  JPEG: SaveFormat.JPEG,
  PNG: SaveFormat.PNG,
  WEBP: SaveFormat.WEBP,
};

export const convertFormat = async (uri, targetFormat, quality = 1) => {
  const format = SupportedFormats[targetFormat.toUpperCase()];
  
  if (!format) {
    throw new Error(`Formato no soportado: ${targetFormat}`);
  }

  try {
    const result = await manipulateAsync(
      uri,
      [],
      { compress: quality, format }
    );

    return result.uri;
  } catch (error) {
    console.error('Error converting format:', error);
    throw error;
  }
};

export const convertToJpeg = async (uri, quality = 0.9) => {
  return convertFormat(uri, 'JPEG', quality);
};

export const convertToPng = async (uri) => {
  return convertFormat(uri, 'PNG', 1);
};

export const convertToWebp = async (uri, quality = 0.8) => {
  return convertFormat(uri, 'WEBP', quality);
};

export const getFormatInfo = (uri) => {
  const extension = uri.split('.').pop().toLowerCase();
  const formatMap = {
    'jpg': 'JPEG',
    'jpeg': 'JPEG',
    'png': 'PNG',
    'webp': 'WEBP',
  };

  return {
    extension,
    format: formatMap[extension] || 'UNKNOWN',
    isSupported: extension in formatMap,
  };
};

export const batchConvert = async (uris, targetFormat, quality = 0.8) => {
  const results = [];

  for (const uri of uris) {
    try {
      const result = await convertFormat(uri, targetFormat, quality);
      results.push({ success: true, uri: result });
    } catch (error) {
      results.push({ success: false, error: error.message });
    }
  }

  return results;
};