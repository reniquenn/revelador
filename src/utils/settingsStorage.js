import AsyncStorage from '@react-native-async-storage/async-storage';

const SETTINGS_KEY = '@app_settings';

export const saveSettings = async (settings) => {
  try {
    await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    return true;
  } catch (error) {
    console.error('Error saving settings:', error);
    throw error;
  }
};

export const loadSettings = async () => {
  try {
    const settingsJson = await AsyncStorage.getItem(SETTINGS_KEY);
    return settingsJson ? JSON.parse(settingsJson) : null;
  } catch (error) {
    console.error('Error loading settings:', error);
    throw error;
  }
};

export const clearSettings = async () => {
  try {
    await AsyncStorage.removeItem(SETTINGS_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing settings:', error);
    throw error;
  }
};

export const updateSetting = async (key, value) => {
  try {
    const settings = await loadSettings();
    const updatedSettings = { ...settings, [key]: value };
    await saveSettings(updatedSettings);
    return updatedSettings;
  } catch (error) {
    console.error('Error updating setting:', error);
    throw error;
  }
};