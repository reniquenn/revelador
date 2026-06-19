import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';

export const CompressionAlgorithms = {
  JPEG: 'jpeg',
  PNG: 'png',
  WEBP: 'webp',
  HEIF: 'heif',
};

export const compressWithAlgorithm = async (uri, algorithm, quality = 0.8) => {
  let format;
  
  switch (algorithm) {
    case CompressionAlgorithms.JPEG:
      format = SaveFormat.JPEG;
      break;
    case CompressionAlgorithms.PNG:
      format = SaveFormat.PNG;
      break;
    case CompressionAlgorithms.WEBP:
      format = SaveFormat.WEBP;
      break;
    default:
      format = SaveFormat.JPEG;
  }

  try {
    const result = await manipulateAsync(
      uri,
      [],
      { compress: quality, format }
    );

    return result.uri;
  } catch (error) {
    console.error('Error compressing with algorithm:', error);
    throw error;
  }
};

export const getCompressionRatio = (originalSize, compressedSize) => {
  if (originalSize === 0) return 0;
  return 1 - (compressedSize / originalSize);
};

export const estimateCompressionSize = (originalSize, algorithm, quality) => {
  const algorithmFactors = {
    jpeg: 0.7,
    png: 0.9,
    webp: 0.6,
    heif: 0.5,
  };

  const factor = algorithmFactors[algorithm] || 0.7;
  return originalSize * factor * quality;
};

export const compareAlgorithms = async (uri) => {
  const results = {};

  for (const algorithm of Object.values(CompressionAlgorithms)) {
    try {
      const result = await compressWithAlgorithm(uri, algorithm, 0.8);
      results[algorithm] = result;
    } catch (error) {
      results[algorithm] = null;
    }
  }

  return results;
};