import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { initializeFirebase, uploadImage } from '../config/firebase';

const FirebaseAuth = ({ onAuthSuccess }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleInitialize = async () => {
    setIsLoading(true);
    try {
      const success = initializeFirebase();
      if (success) {
        setIsInitialized(true);
        Alert.alert('Éxito', 'Firebase inicializado correctamente');
      } else {
        Alert.alert('Error', 'No se pudo inicializar Firebase');
      }
    } catch (error) {
      Alert.alert('Error', `No se pudo inicializar Firebase: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUploadTest = async () => {
    if (!isInitialized) {
      Alert.alert('Error', 'Firebase no está inicializado');
      return;
    }

    setIsLoading(true);
    try {
      // Test upload with a dummy image
      const testUri = 'file://test.jpg';
      const downloadURL = await uploadImage(testUri, 'test/image.jpg');
      Alert.alert('Éxito', `Imagen subida: ${downloadURL}`);
      if (onAuthSuccess) {
        onAuthSuccess(downloadURL);
      }
    } catch (error) {
      Alert.alert('Error', `No se pudo subir la imagen: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Firebase Auth</Text>

      {!isInitialized ? (
        <TouchableOpacity
          style={[styles.button, isLoading && styles.buttonDisabled]}
          onPress={handleInitialize}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={styles.buttonText}>Inicializar Firebase</Text>
          )}
        </TouchableOpacity>
      ) : (
        <>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email:</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="tu@email.com"
              placeholderTextColor="#999"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Contraseña:</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Tu contraseña"
              placeholderTextColor="#999"
              secureTextEntry
            />
          </View>

          <TouchableOpacity
            style={[styles.button, styles.uploadButton, isLoading && styles.buttonDisabled]}
            onPress={handleUploadTest}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text style={styles.buttonText}>Probar Subida</Text>
            )}
          </TouchableOpacity>
        </>
      )}

      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>
          Estado: {isInitialized ? 'Conectado' : 'No conectado'}
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
    marginBottom: 15,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 15,
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
  button: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  uploadButton: {
    backgroundColor: '#4CAF50',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  statusContainer: {
    marginTop: 10,
  },
  statusText: {
    color: '#ccc',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default FirebaseAuth;