import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';

export const optimizeForWeb = async (uri, options = {}) => {
  const {
    maxWidth = 1200,
    quality = 0.8,
    format = 'JPEG',
    stripMetadata = true,
  } = options;

  try {
    const result = await manipulateAsync(
      uri,
      [{ resize: { width: maxWidth } }],
      { 
        compress: quality, 
        format: format === 'PNG' ? SaveFormat.PNG : SaveFormat.JPEG,
      }
    );

    return result.uri;
  } catch (error) {
    console.error('Error optimizing for web:', error);
    throw error;
  }
};

export const createResponsiveImages = async (uri) => {
  const sizes = [
    { name: 'thumbnail', width: 150 },
    { name: 'small', width: 300 },
    { name: 'medium', width: 600 },
    { name: 'large', width: 1200 },
    { name: 'original', width: 1920 },
  ];

  const results = {};

  for (const size of sizes) {
    try {
      const result = await manipulateAsync(
        uri,
        [{ resize: { width: size.width } }],
        { compress: 0.8, format: SaveFormat.JPEG }
      );
      results[size.name] = result.uri;
    } catch (error) {
      console.error(`Error creating ${size.name} image:`, error);
    }
  }

  return results;
};

export const generateBlurHash = async (uri) => {
  // This is a placeholder - in production, you'd use a library like blurhash
  // For now, just return a placeholder string
  return 'LEHV6nWB2yk8pyoJadR*.7kCMsnj';
};

export const createSocialMediaPreview = async (uri, platform = 'twitter') => {
  const dimensions = {
    twitter: { width: 1200, height: 630 },
    facebook: { width: 1200, height: 630 },
    instagram: { width: 1080, height: 1080 },
    linkedin: { width: 1200, height: 627 },
  };

  const { width, height } = dimensions[platform] || dimensions.twitter;

  try {
    const result = await manipulateAsync(
      uri,
      [{ resize: { width, height } }],
      { compress: 0.8, format: SaveFormat.JPEG }
    );

    return result.uri;
  } catch (error) {
    console.error('Error creating social media preview:', error);
    throw error;
  }
};

export const calculateOptimalQuality = (fileSize, targetSize) => {
  if (fileSize <= targetSize) return 1;
  
  const ratio = targetSize / fileSize;
  return Math.max(0.1, Math.min(1, ratio));
};