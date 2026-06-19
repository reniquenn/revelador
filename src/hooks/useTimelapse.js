import { useState, useRef, useEffect, useCallback } from 'react';

export const useTimelapse = (captureFunction) => {
  const [isCapturing, setIsCapturing] = useState(false);
  const [interval, setInterval] = useState(5000); // Default 5 seconds
  const [capturedPhotos, setCapturedPhotos] = useState([]);
  const [error, setError] = useState(null);
  const intervalRef = useRef(null);

  const startTimelapse = useCallback(async (intervalMs) => {
    if (intervalMs) {
      setInterval(intervalMs);
    }

    setIsCapturing(true);
    setError(null);

    // Take first photo immediately
    try {
      const photoPath = await captureFunction();
      setCapturedPhotos(prev => [...prev, { path: photoPath, timestamp: Date.now() }]);
    } catch (err) {
      setError(err.message);
      setIsCapturing(false);
      return;
    }

    // Set up interval for subsequent photos
    intervalRef.current = setInterval(async () => {
      try {
        const photoPath = await captureFunction();
        setCapturedPhotos(prev => [...prev, { path: photoPath, timestamp: Date.now() }]);
      } catch (err) {
        setError(err.message);
        stopTimelapse();
      }
    }, interval);
  }, [captureFunction, interval]);

  const stopTimelapse = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsCapturing(false);
  }, []);

  const clearPhotos = useCallback(() => {
    setCapturedPhotos([]);
  }, []);

  const updateInterval = useCallback((newInterval) => {
    setInterval(newInterval);
    if (isCapturing) {
      stopTimelapse();
      startTimelapse(newInterval);
    }
  }, [isCapturing, stopTimelapse, startTimelapse]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    isCapturing,
    interval,
    capturedPhotos,
    error,
    startTimelapse,
    stopTimelapse,
    clearPhotos,
    updateInterval,
  };
};