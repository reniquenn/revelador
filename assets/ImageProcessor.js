// ImageProcessor.js (Solución Sencilla usando estilos)

import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default function ImageProcessor({ photoUri, onRetake }) {
  // NOTA: 'invert' es una propiedad de CSS/Web, no nativa de React Native 'Image'
  // Para que esto funcione realmente, se necesita un componente que aplique filtros
  // GLSL/GPU, como react-native-image-filter-kit o react-native-image-marker.

  // **Esta simulación usa estilos para mostrar dónde se aplicaría la inversión.**

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Negativo Revelado (Simulado)</Text>
      
      <Image
        source={{ uri: `file://${photoUri}` }}
        style={[
          styles.image,
          // 💡 Aplicación del filtro de Inversión (requiere librerías de filtros reales)
          // La línea siguiente es conceptualmente donde se aplica el filtro:
          // { filter: 'invert(100%) hue-rotate(180deg) saturate(1.5)' } 
          // En React Native, aplicamos un color overlay o usamos librerías de filtros.
          { transform: [{ rotate: '90deg' }], 
            tintColor: 'white', // Simulación básica.
            opacity: 0.8, // Otra simulación.
          }
        ]}
        resizeMode="contain"
      />

      <TouchableOpacity style={styles.button} onPress={onRetake}>
        <Text style={styles.buttonText}>Tomar otra foto</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  title: {
    color: 'white',
    fontSize: 20,
    marginBottom: 15,
  },
  image: {
    width: width * 0.9,
    height: width * 0.9,
    // La imagen se rota para compensar la orientación de la cámara
  },
  button: {
    marginTop: 30,
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});