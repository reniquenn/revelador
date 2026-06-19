import React, { useState } from 'react';
import { View, StyleSheet, Text, Switch, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { APP_CONFIG } from '../utils/config';
import CacheInfo from './CacheInfo';
import CloudSync from './CloudSync';
import BackgroundTasks from './BackgroundTasks';
import FirebaseAuth from './FirebaseAuth';

const AppSettings = ({ onSave, onCancel }) => {
  const [settings, setSettings] = useState(APP_CONFIG);

  const handleToggle = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSave = () => {
    Alert.alert(
      'Guardar Configuración',
      '¿Estás seguro de que quieres guardar los cambios?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Guardar',
          onPress: () => {
            onSave(settings);
            Alert.alert('Éxito', 'Configuración guardada correctamente');
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Configuración de la App</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Cámara</Text>
        
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Flash por defecto</Text>
          <Text style={styles.settingValue}>{settings.camera.defaultFlash}</Text>
        </View>
        
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Calidad de foto</Text>
          <Text style={styles.settingValue}>{settings.camera.qualityPrioritization}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Timelapse</Text>
        
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Intervalo por defecto</Text>
          <Text style={styles.settingValue}>{settings.timelapse.defaultInterval / 1000}s</Text>
        </View>
        
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Intervalo mínimo</Text>
          <Text style={styles.settingValue}>{settings.timelapse.minInterval / 1000}s</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Captura Programada</Text>
        
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Intervalo por defecto</Text>
          <Text style={styles.settingValue}>{settings.scheduledCapture.defaultIntervalMinutes} min</Text>
        </View>
        
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Hora inicio</Text>
          <Text style={styles.settingValue}>{settings.scheduledCapture.defaultStartTime}</Text>
        </View>
        
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Hora fin</Text>
          <Text style={styles.settingValue}>{settings.scheduledCapture.defaultEndTime}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notificaciones</Text>
        
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Habilitadas</Text>
          <Switch
            value={settings.notifications.enabled}
            onValueChange={() => handleToggle('notifications')}
          />
        </View>
        
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Sonido</Text>
          <Switch
            value={settings.notifications.sound}
            onValueChange={() => handleToggle('notifications')}
          />
        </View>
      </View>

      <CacheInfo />
      
      <CloudSync />
      
      <BackgroundTasks />
      
      <FirebaseAuth />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.buttonText}>Guardar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    color: '#2196F3',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  settingLabel: {
    color: 'white',
    fontSize: 16,
  },
  settingValue: {
    color: '#ccc',
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
  },
  cancelButton: {
    backgroundColor: '#f44336',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AppSettings;