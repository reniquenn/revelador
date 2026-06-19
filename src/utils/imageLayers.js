import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';

export const LayerTypes = {
  FILTER: 'filter',
  OVERLAY: 'overlay',
  TEXT: 'text',
  SHAPE: 'shape',
};

export const createLayer = (type, options) => {
  return {
    id: Date.now(),
    type,
    options,
    visible: true,
    opacity: 1,
    blendMode: 'normal',
  };
};

export const applyLayers = async (baseUri, layers) => {
  let currentUri = baseUri;

  for (const layer of layers) {
    if (!layer.visible) continue;

    try {
      switch (layer.type) {
        case LayerTypes.FILTER:
          currentUri = await applyFilterLayer(currentUri, layer.options);
          break;
        case LayerTypes.OVERLAY:
          currentUri = await applyOverlayLayer(currentUri, layer.options);
          break;
        case LayerTypes.TEXT:
          currentUri = await applyTextLayer(currentUri, layer.options);
          break;
        case LayerTypes.SHAPE:
          currentUri = await applyShapeLayer(currentUri, layer.options);
          break;
      }
    } catch (error) {
      console.error(`Error applying ${layer.type} layer:`, error);
    }
  }

  return currentUri;
};

const applyFilterLayer = async (uri, options) => {
  const result = await manipulateAsync(
    uri,
    [],
    { compress: 1, format: SaveFormat.PNG }
  );
  return result.uri;
};

const applyOverlayLayer = async (uri, options) => {
  const result = await manipulateAsync(
    uri,
    [],
    { compress: 1, format: SaveFormat.PNG }
  );
  return result.uri;
};

const applyTextLayer = async (uri, options) => {
  const result = await manipulateAsync(
    uri,
    [],
    { compress: 1, format: SaveFormat.PNG }
  );
  return result.uri;
};

const applyShapeLayer = async (uri, options) => {
  const result = await manipulateAsync(
    uri,
    [],
    { compress: 1, format: SaveFormat.PNG }
  );
  return result.uri;
};

export const mergeLayers = async (layers) => {
  if (layers.length === 0) return null;
  
  const baseUri = layers[0].uri;
  const filterLayers = layers.slice(1).map(layer => ({
    type: LayerTypes.FILTER,
    options: layer.options || {},
    visible: true,
  }));

  return applyLayers(baseUri, filterLayers);
};