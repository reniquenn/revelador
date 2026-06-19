import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import * as Notifications from 'expo-notifications';

const BACKGROUND_FETCH_TASK = 'background-fetch-task';
const BACKGROUND_CAPTURE_TASK = 'background-capture-task';

// Define the background fetch task
TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
  try {
    // Perform background fetch operations
    console.log('Background fetch executed');
    
    // Send notification
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Tarea en segundo plano',
        body: 'Revelador está ejecutando tareas en segundo plano',
      },
      trigger: null,
    });

    return BackgroundFetch.BackgroundFetchResult.NewData;
  } catch (error) {
    console.error('Background fetch error:', error);
    return BackgroundFetch.BackgroundFetchResult.Failed;
  }
});

// Define the background capture task
TaskManager.defineTask(BACKGROUND_CAPTURE_TASK, async () => {
  try {
    // Perform background capture operations
    console.log('Background capture executed');
    
    // Send notification
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Captura en segundo plano',
        body: 'Se ha realizado una captura automática',
      },
      trigger: null,
    });

    return BackgroundFetch.BackgroundFetchResult.NewData;
  } catch (error) {
    console.error('Background capture error:', error);
    return BackgroundFetch.BackgroundFetchResult.Failed;
  }
});

export const registerBackgroundFetch = async () => {
  try {
    const status = await BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
      minimumFetchInterval: 15, // Minimum 15 minutes
      stopOnTerminate: false,
      startOnBoot: true,
    });
    
    console.log('Background fetch registered:', status);
    return status;
  } catch (error) {
    console.error('Error registering background fetch:', error);
    throw error;
  }
};

export const unregisterBackgroundFetch = async () => {
  try {
    await BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
    console.log('Background fetch unregistered');
    return true;
  } catch (error) {
    console.error('Error unregistering background fetch:', error);
    throw error;
  }
};

export const registerBackgroundCapture = async (intervalMinutes = 30) => {
  try {
    const status = await BackgroundFetch.registerTaskAsync(BACKGROUND_CAPTURE_TASK, {
      minimumFetchInterval: intervalMinutes,
      stopOnTerminate: false,
      startOnBoot: true,
    });
    
    console.log('Background capture registered:', status);
    return status;
  } catch (error) {
    console.error('Error registering background capture:', error);
    throw error;
  }
};

export const unregisterBackgroundCapture = async () => {
  try {
    await BackgroundFetch.unregisterTaskAsync(BACKGROUND_CAPTURE_TASK);
    console.log('Background capture unregistered');
    return true;
  } catch (error) {
    console.error('Error unregistering background capture:', error);
    throw error;
  }
};

export const getBackgroundFetchStatus = async () => {
  try {
    const status = await BackgroundFetch.getStatusAsync();
    return status;
  } catch (error) {
    console.error('Error getting background fetch status:', error);
    throw error;
  }
};

export const isTaskRegistered = async (taskName) => {
  try {
    const isRegistered = await TaskManager.isTaskRegisteredAsync(taskName);
    return isRegistered;
  } catch (error) {
    console.error('Error checking task registration:', error);
    throw error;
  }
};