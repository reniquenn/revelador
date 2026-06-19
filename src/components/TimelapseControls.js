import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, TextInput, Alert } from 'react-native';

const TimelapseControls = ({
  isCapturing,
  interval,
  capturedCount,
  onStart,
  onStop,
  onUpdateInterval,
}) => {
  const [intervalInput, setIntervalInput] = useState(interval.toString());

  const handleIntervalChange = (text) => {
    setIntervalInput(text);
  };

  const handleUpdateInterval = () => {
    const newInterval = parseInt(intervalInput, 10);
    if (isNaN(newInterval) || newInterval < 1000) {
      Alert.alert('Error', 'El intervalo debe ser al menos 1000ms (1 segundo)');
      return;
    }
    onUpdateInterval(newInterval);
  };

  const handleStart = () => {
    const newInterval = parseInt(intervalInput, 10);
    if (isNaN(newInterval) || newInterval < 1000) {
      Alert.alert('Error', 'El intervalo debe ser al menos 1000ms (1 segundo)');
      return;
    }
    onStart(newInterval);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configuración de Timelapse</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Intervalo (ms):</Text>
        <TextInput
          style={styles.input}
          value={intervalInput}
          onChangeText={handleIntervalChange}
          keyboardType="numeric"
          placeholder="5000"
          placeholderTextColor="#999"
        />
        <TouchableOpacity
          style={styles.updateButton}
          onPress={handleUpdateInterval}
        >
          <Text style={styles.updateButtonText}>Actualizar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>
          Estado: {isCapturing ? 'Capturando' : 'Detenido'}
        </Text>
        <Text style={styles.countText}>
          Fotos capturadas: {capturedCount}
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        {!isCapturing ? (
          <TouchableOpacity
            style={[styles.button, styles.startButton]}
            onPress={handleStart}
          >
            <Text style={styles.buttonText}>Iniciar Timelapse</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.button, styles.stopButton]}
            onPress={onStop}
          >
            <Text style={styles.buttonText}>Detener Timelapse</Text>
          </TouchableOpacity>
        )}
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
    marginBottom: 15,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  label: {
    color: 'white',
    marginRight: 10,
    fontSize: 14,
  },
  input: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    color: 'black',
  },
  updateButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
  },
  updateButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  statusContainer: {
    marginBottom: 15,
  },
  statusText: {
    color: 'white',
    fontSize: 14,
    marginBottom: 5,
  },
  countText: {
    color: 'white',
    fontSize: 14,
  },
  buttonContainer: {
    gap: 10,
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

export default TimelapseControls;