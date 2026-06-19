import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';

export const EffectTypes = {
  BLUR: 'blur',
  SHARPEN: 'sharpen',
  VIGNETTE: 'vignette',
  NOISE: 'noise',
  GLITCH: 'glitch',
  PIXELATE: 'pixelate',
  MIRROR: 'mirror',
  KALEIDOSCOPE: 'kaleidoscope',
};

export const applyEffect = async (uri, effectType, intensity = 0.5) => {
  try {
    let result;

    switch (effectType) {
      case EffectTypes.BLUR:
        result = await applyBlurEffect(uri, intensity);
        break;
      case EffectTypes.SHARPEN:
        result = await applySharpenEffect(uri, intensity);
        break;
      case EffectTypes.VIGNETTE:
        result = await applyVignetteEffect(uri, intensity);
        break;
      case EffectTypes.NOISE:
        result = await applyNoiseEffect(uri, intensity);
        break;
      case EffectTypes.GLITCH:
        result = await applyGlitchEffect(uri, intensity);
        break;
      case EffectTypes.PIXELATE:
        result = await applyPixelateEffect(uri, intensity);
        break;
      case EffectTypes.MIRROR:
        result = await applyMirrorEffect(uri);
        break;
      case EffectTypes.KALEIDOSCOPE:
        result = await applyKaleidoscopeEffect(uri);
        break;
      default:
        result = await manipulateAsync(uri, [], { compress: 1, format: SaveFormat.PNG });
    }

    return result.uri;
  } catch (error) {
    console.error('Error applying effect:', error);
    throw error;
  }
};

const applyBlurEffect = async (uri, intensity) => {
  const result = await manipulateAsync(
    uri,
    [],
    { compress: 1, format: SaveFormat.PNG }
  );
  return result.uri;
};

const applySharpenEffect = async (uri, intensity) => {
  const result = await manipulateAsync(
    uri,
    [],
    { compress: 1, format: SaveFormat.PNG }
  );
  return result.uri;
};

const applyVignetteEffect = async (uri, intensity) => {
  const result = await manipulateAsync(
    uri,
    [],
    { compress: 1, format: SaveFormat.PNG }
  );
  return result.uri;
};

const applyNoiseEffect = async (uri, intensity) => {
  const result = await manipulateAsync(
    uri,
    [],
    { compress: 1, format: SaveFormat.PNG }
  );
  return result.uri;
};

const applyGlitchEffect = async (uri, intensity) => {
  const result = await manipulateAsync(
    uri,
    [],
    { compress: 1, format: SaveFormat.PNG }
  );
  return result.uri;
};

const applyPixelateEffect = async (uri, intensity) => {
  const result = await manipulateAsync(
    uri,
    [],
    { compress: 1, format: SaveFormat.PNG }
  );
  return result.uri;
};

const applyMirrorEffect = async (uri) => {
  const result = await manipulateAsync(
    uri,
    [{ flip: { horizontal: true, vertical: false } }],
    { compress: 1, format: SaveFormat.PNG }
  );
  return result.uri;
};

const applyKaleidoscopeEffect = async (uri) => {
  const result = await manipulateAsync(
    uri,
    [],
    { compress: 1, format: SaveFormat.PNG }
  );
  return result.uri;
};

export const applyMultipleEffects = async (uri, effects) => {
  let currentUri = uri;

  for (const effect of effects) {
    currentUri = await applyEffect(currentUri, effect.type, effect.intensity);
  }

  return currentUri;
};