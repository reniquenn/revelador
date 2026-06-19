import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Switch, TouchableOpacity, Alert } from 'react-native';
import {
  registerBackgroundFetch,
  unregisterBackgroundFetch,
  registerBackgroundCapture,
  unregisterBackgroundCapture,
  getBackgroundFetchStatus,
  isTaskRegistered,
} from '../utils/backgroundTasks';

const BackgroundTasks = () => {
  const [isBackgroundFetchEnabled, setIsBackgroundFetchEnabled] = useState(false);
  const [isBackgroundCaptureEnabled, setIsBackgroundCaptureEnabled] = useState(false);
  const [captureInterval, setCaptureInterval] = useState(30);

  useEffect(() => {
    checkTaskStatus();
  }, []);

  const checkTaskStatus = async () => {
    try {
      const fetchStatus = await isTaskRegistered('background-fetch-task');
      const captureStatus = await isTaskRegistered('background-capture-task');
      
      setIsBackgroundFetchEnabled(fetchStatus);
      setIsBackgroundCaptureEnabled(captureStatus);
    } catch (error) {
      console.error('Error checking task status:', error);
    }
  };

  const handleToggleBackgroundFetch = async () => {
    try {
      if (isBackgroundFetchEnabled) {
        await unregisterBackgroundFetch();
        setIsBackgroundFetchEnabled(false);
        Alert.alert('Éxito', 'Tareas en segundo plano deshabilitadas');
      } else {
        await registerBackgroundFetch();
        setIsBackgroundFetchEnabled(true);
        Alert.alert('Éxito', 'Tareas en segundo plano habilitadas');
      }
    } catch (error) {
      Alert.alert('Error', `No se pudo cambiar el estado: ${error.message}`);
    }
  };

  const handleToggleBackgroundCapture = async () => {
    try {
      if (isBackgroundCaptureEnabled) {
        await unregisterBackgroundCapture();
        setIsBackgroundCaptureEnabled(false);
        Alert.alert('Éxito', 'Captura en segundo plano deshabilitada');
      } else {
        await registerBackgroundCapture(captureInterval);
        setIsBackgroundCaptureEnabled(true);
        Alert.alert('Éxito', `Captura en segundo plano habilitada cada ${captureInterval} minutos`);
      }
    } catch (error) {
      Alert.alert('Error', `No se pudo cambiar el estado: ${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tareas en Segundo Plano</Text>

      <View style={styles.taskContainer}>
        <View style={styles.taskHeader}>
          <Text style={styles.taskName}>Obtención de datos en segundo plano</Text>
          <Switch
            value={isBackgroundFetchEnabled}
            onValueChange={handleToggleBackgroundFetch}
          />
        </View>
        <Text style={styles.taskDescription}>
          Permite que la app ejecute tareas periódicas en segundo plano
        </Text>
      </View>

      <View style={styles.taskContainer}>
        <View style={styles.taskHeader}>
          <Text style={styles.taskName}>Captura automática en segundo plano</Text>
          <Switch
            value={isBackgroundCaptureEnabled}
            onValueChange={handleToggleBackgroundCapture}
          />
        </View>
        <Text style={styles.taskDescription}>
          Captura fotos automáticamente cada {captureInterval} minutos
        </Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          Nota: Las tareas en segundo plano pueden afectar el consumo de batería
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 20,
    borderRadius: 10,
    margin: 10,
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  taskContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#222',
    borderRadius: 8,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  taskName: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  taskDescription: {
    color: '#ccc',
    fontSize: 14,
  },
  infoContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#333',
    borderRadius: 5,
  },
  infoText: {
    color: '#ff9800',
    fontSize: 12,
    textAlign: 'center',
  },
});

export default BackgroundTasks;