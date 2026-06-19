import React from 'react';
import { render } from '@testing-library/react-native';
import App from '../App';

// Mock de react-native-vision-camera
jest.mock('react-native-vision-camera', () => ({
  Camera: 'Camera',
  useCameraDevices: jest.fn(() => ({
    back: { id: 'back', name: 'Back Camera' },
  })),
}));

// Mock de react-native-image-filter-kit
jest.mock('react-native-image-filter-kit', () => ({
  Invert: 'Invert',
}));

// Mock de expo-notifications
jest.mock('expo-notifications', () => ({
  requestPermissionsAsync: jest.fn(() => Promise.resolve({ status: 'granted' })),
  scheduleNotificationAsync: jest.fn(),
  setNotificationHandler: jest.fn(),
}));

// Mock de expo-file-system
jest.mock('expo-file-system', () => ({
  getInfoAsync: jest.fn(() => Promise.resolve({ exists: true })),
  makeDirectoryAsync: jest.fn(),
  readDirectoryAsync: jest.fn(() => Promise.resolve([])),
  deleteAsync: jest.fn(),
  copyAsync: jest.fn(),
  moveAsync: jest.fn(),
  readAsStringAsync: jest.fn(),
  writeAsStringAsync: jest.fn(),
}));

// Mock de expo-media-library
jest.mock('expo-media-library', () => ({
  requestPermissionsAsync: jest.fn(() => Promise.resolve({ status: 'granted' })),
  createAssetAsync: jest.fn(() => Promise.resolve({ uri: 'test://uri' })),
  getAlbumAsync: jest.fn(() => Promise.resolve(null)),
  createAlbumAsync: jest.fn(),
  addAssetsToAlbumAsync: jest.fn(),
}));

describe('App', () => {
  it('renders correctly', () => {
    const { getByText } = render(<App />);
    expect(getByText('Revelador')).toBeTruthy();
  });
});