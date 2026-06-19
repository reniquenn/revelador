import React from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity, Image, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width - 40) / 2;

const CaptureHistory = ({ captures, onSelectCapture, onDeleteCapture }) => {
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString();
  };

  const renderCapture = ({ item }) => (
    <TouchableOpacity
      style={styles.captureItem}
      onPress={() => onSelectCapture(item)}
    >
      <Image
        source={{ uri: `file://${item.path}` }}
        style={styles.captureImage}
        resizeMode="cover"
      />
      <View style={styles.captureInfo}>
        <Text style={styles.captureDate}>{formatDate(item.timestamp)}</Text>
        <Text style={styles.captureTime}>{formatTime(item.timestamp)}</Text>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => onDeleteCapture(item)}
      >
        <Text style={styles.deleteButtonText}>×</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historial de Capturas ({captures.length})</Text>
      <FlatList
        data={captures}
        renderItem={renderCapture}
        keyExtractor={(item) => item.timestamp.toString()}
        numColumns={2}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 15,
  },
  list: {
    padding: 10,
  },
  captureItem: {
    width: ITEM_WIDTH,
    height: ITEM_WIDTH,
    margin: 5,
    borderRadius: 5,
    overflow: 'hidden',
  },
  captureImage: {
    width: '100%',
    height: '100%',
  },
  captureInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 5,
  },
  captureDate: {
    color: 'white',
    fontSize: 12,
  },
  captureTime: {
    color: '#ccc',
    fontSize: 10,
  },
  deleteButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(255, 0, 0, 0.7)',
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default CaptureHistory;