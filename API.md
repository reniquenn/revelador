# API Reference

## Hooks

### useCamera

Hook personalizado para manejar la cámara.

```javascript
import { useCamera } from '../hooks/useCamera';

const {
  cameraRef,
  device,
  hasPermission,
  isProcessing,
  photoUri,
  takePhoto,
  clearPhoto,
} = useCamera();
```

**Propiedades:**
- `cameraRef`: Referencia al componente Camera
- `device`: Dispositivo de cámara detectado
- `hasPermission`: Boolean indicando si hay permisos
- `isProcessing`: Boolean indicando si se está procesando una foto
- `photoUri`: URI de la última foto tomada

**Métodos:**
- `takePhoto(options)`: Toma una foto con opciones opcionales
- `clearPhoto`: Limpia la foto actual

### useTimelapse

Hook personalizado para captura periódica.

```javascript
import { useTimelapse } from '../hooks/useTimelapse';

const {
  isCapturing,
  interval,
  capturedPhotos,
  error,
  startTimelapse,
  stopTimelapse,
  clearPhotos,
  updateInterval,
} = useTimelapse(captureFunction);
```

**Propiedades:**
- `isCapturing`: Boolean indicando si está capturando
- `interval`: Intervalo actual en milisegundos
- `capturedPhotos`: Array de fotos capturadas
- `error`: Error actual si lo hay

**Métodos:**
- `startTimelapse(intervalMs)`: Inicia la captura periódica
- `stopTimelapse`: Detiene la captura
- `clearPhotos`: Limpia todas las fotos
- `updateInterval(newInterval)`: Actualiza el intervalo

### useImageProcessor

Hook personalizado para procesamiento de imágenes.

```javascript
import { useImageProcessor } from '../hooks/useImageProcessor';

const {
  isProcessing,
  processedUri,
  error,
  invertColors,
  applyFilter,
  clearProcessed,
} = useImageProcessor();
```

**Propiedades:**
- `isProcessing`: Boolean indicando si se está procesando
- `processedUri`: URI de la imagen procesada
- `error`: Error actual si lo hay

**Métodos:**
- `invertColors(imageUri)`: Invierte los colores de la imagen
- `applyFilter(imageUri, filterType)`: Aplica un filtro específico
- `clearProcessed`: Limpia la imagen procesada

### useScheduledCapture

Hook personalizado para captura programada.

```javascript
import { useScheduledCapture } from '../hooks/useScheduledCapture';

const {
  isScheduled,
  scheduleConfig,
  capturedCount,
  startSchedule,
  stopSchedule,
  resetCount,
} = useScheduledCapture(captureFunction);
```

**Propiedades:**
- `isScheduled`: Boolean indicando si hay programación activa
- `scheduleConfig`: Configuración actual de programación
- `capturedCount`: Número de fotos capturadas

**Métodos:**
- `startSchedule(config)`: Inicia la programación
- `stopSchedule`: Detiene la programación
- `resetCount`: Reinicia el contador de fotos

## Components

### CameraView

Componente de vista de cámara.

```javascript
<CameraView
  cameraRef={cameraRef}
  device={device}
  hasPermission={hasPermission}
  isProcessing={isProcessing}
  onTakePhoto={handleTakePhoto}
/>
```

**Props:**
- `cameraRef`: Referencia a la cámara
- `device`: Dispositivo de cámara
- `hasPermission`: Boolean de permisos
- `isProcessing`: Boolean de procesamiento
- `onTakePhoto`: Callback al tomar foto

### ImageProcessor

Componente de procesamiento de imágenes.

```javascript
<ImageProcessor
  photoUri={photoUri}
  onRetake={handleRetake}
  onSave={handleSave}
/>
```

**Props:**
- `photoUri`: URI de la foto a procesar
- `onRetake`: Callback para tomar otra foto
- `onSave`: Callback para guardar la foto

### TimelapseControls

Controles para captura periódica.

```javascript
<TimelapseControls
  isCapturing={isCapturing}
  interval={interval}
  capturedCount={capturedPhotos.length}
  onStart={handleStartTimelapse}
  onStop={handleStopTimelapse}
  onUpdateInterval={updateInterval}
/>
```

### ScheduledCapture

Configuración de captura programada.

```javascript
<ScheduledCapture
  onStartSchedule={handleStartSchedule}
  onStopSchedule={handleStopSchedule}
/>
```

### PhotoGallery

Galería de fotos capturadas.

```javascript
<PhotoGallery
  photos={capturedPhotos}
  onSelectPhoto={handleSelectPhoto}
  onDeletePhoto={handleDeletePhoto}
/>
```

### CaptureStats

Estadísticas de captura.

```javascript
<CaptureStats
  timelapseCount={timelapseCount}
  scheduledCount={scheduledCount}
  totalCount={totalCount}
  lastCaptureTime={lastCaptureTime}
/>
```

### AppSettings

Configuración de la aplicación.

```javascript
<AppSettings
  onSave={handleSaveSettings}
  onCancel={handleCancelSettings}
/>
```

## Utilities

### storage.js

```javascript
import { savePhotoToGallery, deletePhoto, getPhotoInfo } from '../utils/storage';

// Guardar foto en galería
await savePhotoToGallery(photoUri);

// Eliminar foto
await deletePhoto(photoUri);

// Obtener información de foto
const info = await getPhotoInfo(photoUri);
```

### dateUtils.js

```javascript
import { formatDate, formatTime, formatDuration } from '../utils/dateUtils';

// Formatear fecha
const date = formatDate(new Date()); // "19/06/2026"

// Formatear hora
const time = formatTime(new Date()); // "15:30:45"

// Formatear duración
const duration = formatDuration(3661000); // "1h 1m"
```

### fileUtils.js

```javascript
import { createDirectory, listFiles, deleteFile } from '../utils/fileUtils';

// Crear directorio
await createDirectory('/path/to/dir');

// Listar archivos
const files = await listFiles('/path/to/dir');

// Eliminar archivo
await deleteFile('/path/to/file');
```

### imageCompression.js

```javascript
import { compressImage, resizeImage, rotateImage } from '../utils/imageCompression';

// Comprimir imagen
const compressed = await compressImage(uri, 0.8, 1920);

// Redimensionar imagen
const resized = await resizeImage(uri, 800, 600);

// Rotar imagen
const rotated = await rotateImage(uri, 90);
```

### imageQuality.js

```javascript
import { compressWithPreset, QualityPresets } from '../utils/imageQuality';

// Comprimir con preset
const compressed = await compressWithPreset(uri, 'HIGH');

// Presets disponibles
// LOW: 30% calidad, 800px máximo
// MEDIUM: 60% calidad, 1200px máximo
// HIGH: 80% calidad, 1920px máximo
// VERY_HIGH: 95% calidad, 2560px máximo
// MAX: 100% calidad, 3840px máximo
```

### imageFormats.js

```javascript
import { convertToJpeg, convertToPng, convertToWebp } from '../utils/imageFormats';

// Convertir a JPEG
const jpeg = await convertToJpeg(uri, 0.9);

// Convertir a PNG
const png = await convertToPng(uri);

// Convertir a WebP
const webp = await convertToWebp(uri, 0.8);
```

### exportUtils.js

```javascript
import { exportToGallery, sharePhoto, createBackup } from '../utils/exportUtils';

// Exportar a galería
await exportToGallery(photoUri);

// Compartir foto
await sharePhoto(photoUri);

// Crear copia de seguridad
const backupUri = await createBackup(photoUri, 'backup_name.jpg');
```

### compressionAlgorithms.js

```javascript
import { compressWithAlgorithm, CompressionAlgorithms } from '../utils/compressionAlgorithms';

// Comprimir con algoritmo específico
const compressed = await compressWithAlgorithm(uri, 'webp', 0.8);

// Algoritmos disponibles
// jpeg, png, webp, heif
```

### specialEffects.js

```javascript
import { applyEffect, EffectTypes } from '../utils/specialEffects';

// Aplicar efecto
const result = await applyEffect(uri, 'blur', 0.5);

// Efectos disponibles
// blur, sharpen, vignette, noise, glitch, pixelate, mirror, kaleidoscope
```

### imageLayers.js

```javascript
import { createLayer, applyLayers, LayerTypes } from '../utils/imageLayers';

// Crear capa
const layer = createLayer('filter', { /* options */ });

// Aplicar capas
const result = await applyLayers(baseUri, layers);

// Tipos de capa
// filter, overlay, text, shape
```