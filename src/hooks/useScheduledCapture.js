import { useState, useRef, useEffect, useCallback } from 'react';
import * as Notifications from 'expo-notifications';
import { savePhotoToGallery } from '../utils/storage';

export const useScheduledCapture = (captureFunction) => {
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduleConfig, setScheduleConfig] = useState(null);
  const [capturedCount, setCapturedCount] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    // Configure notification handler
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });
  }, []);

  const isInTimeRange = useCallback((config) => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    
    const startMinutes = config.startHour * 60 + config.startMinute;
    const endMinutes = config.endHour * 60 + config.endMinute;
    const currentMinutes = currentHour * 60 + currentMinute;
    
    return currentMinutes >= startMinutes && currentMinutes <= endMinutes;
  }, []);

  const startSchedule = useCallback(async (config) => {
    if (isScheduled) {
      stopSchedule();
    }

    setScheduleConfig(config);
    setIsScheduled(true);

    // Take first photo immediately if in time range
    if (isInTimeRange(config)) {
      try {
        const photoPath = await captureFunction();
        await savePhotoToGallery(photoPath);
        setCapturedCount(prev => prev + 1);
        
        await Notifications.scheduleNotificationAsync({
          content: {
            title: 'Foto capturada',
            body: 'Se ha capturado una foto programada',
          },
          trigger: null,
        });
      } catch (error) {
        console.error('Error capturing scheduled photo:', error);
      }
    }

    // Set up interval for subsequent captures
    const intervalMs = config.intervalMinutes * 60 * 1000;
    intervalRef.current = setInterval(async () => {
      if (isInTimeRange(config)) {
        try {
          const photoPath = await captureFunction();
          await savePhotoToGallery(photoPath);
          setCapturedCount(prev => prev + 1);
          
          await Notifications.scheduleNotificationAsync({
            content: {
              title: 'Foto capturada',
              body: 'Se ha capturado una foto programada',
            },
            trigger: null,
          });
        } catch (error) {
          console.error('Error capturing scheduled photo:', error);
        }
      }
    }, intervalMs);
  }, [captureFunction, isScheduled, isInTimeRange]);

  const stopSchedule = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsScheduled(false);
    setScheduleConfig(null);
  }, []);

  const resetCount = useCallback(() => {
    setCapturedCount(0);
  }, []);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    isScheduled,
    scheduleConfig,
    capturedCount,
    startSchedule,
    stopSchedule,
    resetCount,
  };
};