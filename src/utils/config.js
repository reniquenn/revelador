export const APP_CONFIG = {
  // Camera settings
  camera: {
    defaultFlash: 'off',
    qualityPrioritization: 'quality',
    photoFormat: 'png',
  },

  // Timelapse settings
  timelapse: {
    defaultInterval: 5000, // 5 seconds
    minInterval: 1000, // 1 second
    maxInterval: 3600000, // 1 hour
  },

  // Scheduled capture settings
  scheduledCapture: {
    defaultIntervalMinutes: 30,
    defaultStartTime: '08:00',
    defaultEndTime: '18:00',
    minIntervalMinutes: 1,
    maxIntervalMinutes: 1440, // 24 hours
  },

  // Image processing settings
  imageProcessing: {
    compression: 1,
    format: 'png',
  },

  // Storage settings
  storage: {
    albumName: 'Revelador',
    maxPhotos: 1000,
  },

  // Notification settings
  notifications: {
    enabled: true,
    sound: true,
    vibrate: true,
  },

  // UI settings
  ui: {
    theme: 'dark',
    language: 'es',
  },
};

export const FILTER_TYPES = {
  INVERT: 'invert',
  GRAYSCALE: 'grayscale',
  SEPIA: 'sepia',
  BRIGHTNESS: 'brightness',
  CONTRAST: 'contrast',
};

export const CAPTURE_MODES = {
  SINGLE: 'single',
  TIMELAPSE: 'timelapse',
  SCHEDULED: 'scheduled',
};