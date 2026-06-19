export interface Photo {
  path: string;
  timestamp: number;
  metadata?: PhotoMetadata;
}

export interface PhotoMetadata {
  width?: number;
  height?: number;
  format?: string;
  size?: number;
  creationTime?: number;
  modificationTime?: number;
}

export interface TimelapseConfig {
  interval: number;
  maxPhotos?: number;
  startTime?: number;
  endTime?: number;
}

export interface ScheduledCaptureConfig {
  intervalMinutes: number;
  startHour: number;
  startMinute: number;
  endHour: number;
  endMinute: number;
}

export interface ImageFilter {
  type: string;
  intensity?: number;
  options?: Record<string, any>;
}

export interface ExportOptions {
  format: 'jpeg' | 'png' | 'webp';
  quality: number;
  maxWidth?: number;
  maxHeight?: number;
}

export interface AppSettings {
  camera: {
    defaultFlash: 'on' | 'off' | 'auto';
    qualityPrioritization: 'quality' | 'speed' | 'balanced';
  };
  timelapse: {
    defaultInterval: number;
    minInterval: number;
    maxInterval: number;
  };
  scheduledCapture: {
    defaultIntervalMinutes: number;
    defaultStartTime: string;
    defaultEndTime: string;
  };
  notifications: {
    enabled: boolean;
    sound: boolean;
    vibrate: boolean;
  };
  storage: {
    albumName: string;
    maxPhotos: number;
  };
}

export interface CaptureStats {
  timelapseCount: number;
  scheduledCount: number;
  totalCount: number;
  lastCaptureTime?: number;
}

export interface Layer {
  id: number;
  type: 'filter' | 'overlay' | 'text' | 'shape';
  options: Record<string, any>;
  visible: boolean;
  opacity: number;
  blendMode: string;
}

export interface Effect {
  type: string;
  intensity: number;
  options?: Record<string, any>;
}

export interface CloudConfig {
  cloudName: string;
  uploadPreset: string;
  apiKey?: string;
  apiSecret?: string;
}

export interface BackgroundTaskConfig {
  enabled: boolean;
  intervalMinutes: number;
  tasks: {
    fetch: boolean;
    capture: boolean;
  };
}

export interface CompressionOptions {
  algorithm: 'jpeg' | 'png' | 'webp' | 'heif';
  quality: number;
  maxWidth?: number;
  maxHeight?: number;
}

export interface MetadataOptions {
  title?: string;
  description?: string;
  tags?: string[];
  location?: {
    latitude: number;
    longitude: number;
  };
}