import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const CaptureStats = ({
  timelapseCount,
  scheduledCount,
  totalCount,
  lastCaptureTime,
}) => {
  const formatTime = (timestamp) => {
    if (!timestamp) return 'Nunca';
    const date = new Date(timestamp);
    return date.toLocaleTimeString();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Estadísticas de Captura</Text>
      
      <View style={styles.statsGrid}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{timelapseCount}</Text>
          <Text style={styles.statLabel}>Timelapse</Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{scheduledCount}</Text>
          <Text style={styles.statLabel}>Programadas</Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{totalCount}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
      </View>
      
      <View style={styles.lastCapture}>
        <Text style={styles.lastCaptureLabel}>Última captura:</Text>
        <Text style={styles.lastCaptureValue}>{formatTime(lastCaptureTime)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 15,
    borderRadius: 10,
    margin: 10,
  },
  title: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#ccc',
    fontSize: 12,
    marginTop: 5,
  },
  lastCapture: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#333',
    paddingTop: 10,
  },
  lastCaptureLabel: {
    color: '#ccc',
    fontSize: 14,
  },
  lastCaptureValue: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default CaptureStats;