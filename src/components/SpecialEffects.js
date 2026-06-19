import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, Alert, Slider } from 'react-native';
import { applyEffect, EffectTypes } from '../utils/specialEffects';

const SpecialEffects = ({ imageUri, onEffectApplied }) => {
  const [selectedEffect, setSelectedEffect] = useState(null);
  const [intensity, setIntensity] = useState(0.5);
  const [isProcessing, setIsProcessing] = useState(false);

  const effects = [
    { id: EffectTypes.BLUR, name: 'Desenfoque', description: 'Aplica un efecto de desenfoque' },
    { id: EffectTypes.SHARPEN, name: 'Enfoque', description: 'Aumenta la nitidez de la imagen' },
    { id: EffectTypes.VIGNETTE, name: 'Viñeta', description: 'Oscurece los bordes de la imagen' },
    { id: EffectTypes.NOISE, name: 'Ruido', description: 'Agrega ruido aleatorio a la imagen' },
    { id: EffectTypes.GLITCH, name: 'Glitch', description: 'Efecto de distorsión digital' },
    { id: EffectTypes.PIXELATE, name: 'Pixelar', description: 'Pixela la imagen' },
    { id: EffectTypes.MIRROR, name: 'Espejo', description: 'Invierte la imagen horizontalmente' },
    { id: EffectTypes.KALEIDOSCOPE, name: 'Caleidoscopio', description: 'Efecto de caleidoscopio' },
  ];

  const handleApplyEffect = async () => {
    if (!selectedEffect) {
      Alert.alert('Error', 'Selecciona un efecto');
      return;
    }

    setIsProcessing(true);
    try {
      const resultUri = await applyEffect(imageUri, selectedEffect, intensity);
      Alert.alert('Éxito', 'Efecto aplicado correctamente');
      if (onEffectApplied) {
        onEffectApplied(resultUri, selectedEffect, intensity);
      }
    } catch (error) {
      Alert.alert('Error', `No se pudo aplicar el efecto: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Efectos Especiales</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.effectsScroll}>
        {effects.map((effect) => (
          <TouchableOpacity
            key={effect.id}
            style={[
              styles.effectButton,
              selectedEffect === effect.id && styles.effectButtonActive,
            ]}
            onPress={() => setSelectedEffect(effect.id)}
          >
            <Text style={styles.effectName}>{effect.name}</Text>
            <Text style={styles.effectDescription}>{effect.description}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {selectedEffect && (
        <View style={styles.intensityContainer}>
          <Text style={styles.intensityLabel}>Intensidad: {(intensity * 100).toFixed(0)}%</Text>
          <Slider
            style={styles.slider}
            value={intensity}
            onValueChange={setIntensity}
            minimumValue={0}
            maximumValue={1}
            step={0.1}
            minimumTrackTintColor="#2196F3"
            maximumTrackTintColor="#333"
          />
        </View>
      )}

      <TouchableOpacity
        style={[styles.applyButton, (!selectedEffect || isProcessing) && styles.applyButtonDisabled]}
        onPress={handleApplyEffect}
        disabled={!selectedEffect || isProcessing}
      >
        <Text style={styles.applyButtonText}>
          {isProcessing ? 'Procesando...' : 'Aplicar Efecto'}
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
  effectsScroll: {
    marginBottom: 20,
  },
  effectButton: {
    padding: 15,
    backgroundColor: '#333',
    borderRadius: 8,
    marginRight: 10,
    minWidth: 120,
  },
  effectButtonActive: {
    backgroundColor: '#2196F3',
  },
  effectName: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  effectDescription: {
    color: '#ccc',
    fontSize: 10,
  },
  intensityContainer: {
    marginBottom: 20,
  },
  intensityLabel: {
    color: 'white',
    fontSize: 14,
    marginBottom: 10,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  applyButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  applyButtonDisabled: {
    opacity: 0.5,
  },
  applyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SpecialEffects;