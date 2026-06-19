import React from 'react';
import { View, StyleSheet, FlatList, Image, TouchableOpacity, Text, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const ITEM_SIZE = (width - 40) / 3;

const PhotoGallery = ({ photos, onSelectPhoto, onDeletePhoto }) => {
  const renderPhoto = ({ item }) => (
    <TouchableOpacity
      style={styles.photoContainer}
      onPress={() => onSelectPhoto(item)}
    >
      <Image
        source={{ uri: `file://${item.path}` }}
        style={styles.photo}
        resizeMode="cover"
      />
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => onDeletePhoto(item)}
      >
        <Text style={styles.deleteButtonText}>×</Text>
      </TouchableOpacity>
      <View style={styles.timestampContainer}>
        <Text style={styles.timestampText}>
          {new Date(item.timestamp).toLocaleTimeString()}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Galería de Timelapse ({photos.length} fotos)</Text>
      <FlatList
        data={photos}
        renderItem={renderPhoto}
        keyExtractor={(item) => item.timestamp.toString()}
        numColumns={3}
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
  photoContainer: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    margin: 5,
    borderRadius: 5,
    overflow: 'hidden',
  },
  photo: {
    width: '100%',
    height: '100%',
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
  timestampContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 3,
  },
  timestampText: {
    color: 'white',
    fontSize: 10,
    textAlign: 'center',
  },
});

export default PhotoGallery;