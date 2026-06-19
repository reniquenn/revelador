import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Alert, Switch } from 'react-native';
import { uploadToCloud } from '../utils/cloudSync';

const CloudSync = ({ onSyncComplete }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [cloudName, setCloudName] = useState('');
  const [uploadPreset, setUploadPreset] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState(null);

  const handleToggleSync = () => {
    if (!isEnabled && (!cloudName || !uploadPreset)) {
      Alert.alert('Error', 'Por favor ingresa el nombre del cloud y el preset de carga');
      return;
    }
    setIsEnabled(!isEnabled);
  };

  const handleSync = async (photoUri) => {
    if (!isEnabled) {
      Alert.alert('Error', 'La sincronización está deshabilitada');
      return;
    }

    setIsSyncing(true);
    try {
      await uploadToCloud(photoUri, cloudName, uploadPreset);
      setLastSyncTime(new Date());
      Alert.alert('Éxito', 'Foto sincronizada con la nube');
      if (onSyncComplete) {
        onSyncComplete();
      }
    } catch (error) {
      Alert.alert('Error', `No se pudo sincronizar: ${error.message}`);
    } finally {
      setIsSyncing(false);
    }
  };

  const formatLastSync = () => {
    if (!lastSyncTime) return 'Nunca';
    return lastSyncTime.toLocaleString();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sincronización con la Nube</Text>

      <View style={styles.toggleContainer}>
        <Text style={styles.label}>Habilitar sincronización</Text>
        <Switch
          value={isEnabled}
          onValueChange={handleToggleSync}
        />
      </View>

      {isEnabled && (
        <>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Cloud Name:</Text>
            <TextInput
              style={styles.input}
              value={cloudName}
              onChangeText={setCloudName}
              placeholder="Tu cloud name"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Upload Preset:</Text>
            <TextInput
              style={styles.input}
              value={uploadPreset}
              onChangeText={setUploadPreset}
              placeholder="Tu upload preset"
              placeholderTextColor="#999"
            />
          </View>
        </>
      )}

      <View style={styles.statusContainer}>
        <Text style={styles.statusLabel}>Estado:</Text>
        <Text style={styles.statusValue}>
          {isEnabled ? 'Habilitado' : 'Deshabilitado'}
        </Text>
      </View>

      <View style={styles.statusContainer}>
        <Text style={styles.statusLabel}>Última sincronización:</Text>
        <Text style={styles.statusValue}>{formatLastSync()}</Text>
      </View>

      {isSyncing && (
        <Text style={styles.syncingText}>Sincronizando...</Text>
      )}
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
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
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
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  statusLabel: {
    color: '#ccc',
    fontSize: 14,
  },
  statusValue: {
    color: 'white',
    fontSize: 14,
  },
  syncingText: {
    color: '#2196F3',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default CloudSync;