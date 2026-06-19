import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    color: '#ccc',
    fontSize: 18,
    textAlign: 'center',
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  primaryButton: {
    backgroundColor: '#2196F3',
  },
  secondaryButton: {
    backgroundColor: '#4CAF50',
  },
  dangerButton: {
    backgroundColor: '#f44336',
  },
  warningButton: {
    backgroundColor: '#ff9800',
  },
  card: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 20,
    borderRadius: 10,
    margin: 10,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    color: 'black',
  },
  label: {
    color: 'white',
    fontSize: 14,
    marginBottom: 5,
  },
  divider: {
    height: 1,
    backgroundColor: '#333',
    marginVertical: 10,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export const colors = {
  primary: '#2196F3',
  secondary: '#4CAF50',
  danger: '#f44336',
  warning: '#ff9800',
  success: '#4CAF50',
  info: '#2196F3',
  light: '#ffffff',
  dark: '#000000',
  gray: '#cccccc',
  text: '#ffffff',
  textSecondary: '#cccccc',
  background: '#000000',
  surface: 'rgba(0, 0, 0, 0.8)',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const typography = {
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  body: {
    fontSize: 16,
  },
  caption: {
    fontSize: 12,
  },
};