import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import { exportToGallery, sharePhoto, createBackup, exportToDocuments } from '../utils/exportUtils';

const ExportOptions = ({ photoUri, onClose }) => {
  const handleExport = async (option) => {
    try {
      switch (option.id) {
        case 'gallery':
          await exportToGallery(photoUri);
          Alert.alert('Éxito', 'Foto guardada en la galería');
          break;
        case 'share':
          await sharePhoto(photoUri);
          break;
        case 'backup':
          const backupName = `backup_${Date.now()}.jpg`;
          await createBackup(photoUri, backupName);
          Alert.alert('Éxito', `Copia de seguridad creada: ${backupName}`);
          break;
        case 'documents':
          const filename = `photo_${Date.now()}.jpg`;
          await exportToDocuments(photoUri, filename);
          Alert.alert('Éxito', `Foto exportada: ${filename}`);
          break;
      }
      onClose();
    } catch (error) {
      Alert.alert('Error', `No se pudo completar la operación: ${error.message}`);
    }
  };

  const options = [
    { id: 'gallery', label: 'Guardar en Galería', icon: '🖼️' },
    { id: 'share', label: 'Compartir', icon: '📤' },
    { id: 'backup', label: 'Crear Copia de Seguridad', icon: '💾' },
    { id: 'documents', label: 'Exportar a Documentos', icon: '📁' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Opciones de Exportación</Text>
      
      {options.map((option) => (
        <TouchableOpacity
          key={option.id}
          style={styles.optionButton}
          onPress={() => handleExport(option)}
        >
          <Text style={styles.optionIcon}>{option.icon}</Text>
          <Text style={styles.optionLabel}>{option.label}</Text>
        </TouchableOpacity>
      ))}
      
      <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
        <Text style={styles.cancelButtonText}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    padding: 20,
    borderRadius: 10,
    margin: 10,
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#333',
    borderRadius: 8,
    marginBottom: 10,
  },
  optionIcon: {
    fontSize: 20,
    marginRight: 15,
  },
  optionLabel: {
    color: 'white',
    fontSize: 16,
  },
  cancelButton: {
    padding: 15,
    backgroundColor: '#f44336',
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ExportOptions;