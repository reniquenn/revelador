import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, TextInput, Alert, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';

const ScheduledCapture = ({ onStartSchedule, onStopSchedule }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [intervalMinutes, setIntervalMinutes] = useState(30);
  const [startTime, setStartTime] = useState('08:00');
  const [endTime, setEndTime] = useState('18:00');
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    requestNotificationPermissions();
  }, []);

  const requestNotificationPermissions = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    setHasPermission(status === 'granted');
  };

  const handleToggleSchedule = () => {
    if (isEnabled) {
      setIsEnabled(false);
      onStopSchedule();
      Alert.alert('Programación Detendida', 'Las capturas periódicas han sido detenidas');
    } else {
      const startParts = startTime.split(':');
      const endParts = endTime.split(':');
      
      const startHour = parseInt(startParts[0], 10);
      const startMinute = parseInt(startParts[1], 10);
      const endHour = parseInt(endParts[0], 10);
      const endMinute = parseInt(endParts[1], 10);

      if (isNaN(startHour) || isNaN(startMinute) || isNaN(endHour) || isNaN(endMinute)) {
        Alert.alert('Error', 'Formato de hora inválido');
        return;
      }

      if (intervalMinutes < 1) {
        Alert.alert('Error', 'El intervalo debe ser al menos 1 minuto');
        return;
      }

      setIsEnabled(true);
      onStartSchedule({
        intervalMinutes,
        startHour,
        startMinute,
        endHour,
        endMinute,
      });
      
      Alert.alert(
        'Programación Iniciada',
        `Capturas cada ${intervalMinutes} minutos entre ${startTime} y ${endTime}`
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Captura Programada</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Intervalo (minutos):</Text>
        <TextInput
          style={styles.input}
          value={intervalMinutes.toString()}
          onChangeText={(text) => setIntervalMinutes(parseInt(text, 10) || 1)}
          keyboardType="numeric"
          placeholder="30"
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.timeContainer}>
        <View style={styles.timeInput}>
          <Text style={styles.label}>Hora inicio:</Text>
          <TextInput
            style={styles.input}
            value={startTime}
            onChangeText={setStartTime}
            placeholder="08:00"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.timeInput}>
          <Text style={styles.label}>Hora fin:</Text>
          <TextInput
            style={styles.input}
            value={endTime}
            onChangeText={setEndTime}
            placeholder="18:00"
            placeholderTextColor="#999"
          />
        </View>
      </View>

      {!hasPermission && (
        <Text style={styles.warningText}>
          Se necesitan permisos de notificaciones para programar capturas
        </Text>
      )}

      <TouchableOpacity
        style={[
          styles.button,
          isEnabled ? styles.stopButton : styles.startButton,
        ]}
        onPress={handleToggleSchedule}
        disabled={!hasPermission}
      >
        <Text style={styles.buttonText}>
          {isEnabled ? 'Detener Programación' : 'Iniciar Programación'}
        </Text>
      </TouchableOpacity>
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
    marginBottom: 15,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 15,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  timeInput: {
    flex: 1,
    marginHorizontal: 5,
  },
  label: {
    color: 'white',
    marginBottom: 5,
    fontSize: 14,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    color: 'black',
  },
  warningText: {
    color: '#ff6b6b',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 10,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  startButton: {
    backgroundColor: '#4CAF50',
  },
  stopButton: {
    backgroundColor: '#f44336',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ScheduledCapture;