# Revelador - App de Captura y Procesamiento de Fotos

## Descripción
Revelador es una aplicación móvil desarrollada con React Native (Expo) que permite capturar fotos, aplicar filtros de inversión de colores (para revelar negativos) y programar capturas periódicas.

## Características Principales

### 1. Captura de Fotos
- Cámara en tiempo real
- Captura de fotos con un toque
- Soporte para flash

### 2. Procesamiento de Imágenes
- Filtro de inversión de colores (negativo a positivo)
- Comparación entre imagen original y procesada
- Opción de guardar fotos procesadas

### 3. Timelapse
- Captura automática a intervalos configurables
- Intervalos desde 1 segundo hasta 1 hora
- Conteo de fotos capturadas

### 4. Captura Programada
- Programación de capturas por horario
- Configuración de hora de inicio y fin
- Notificaciones de capturas exitosas

### 5. Galería
- Visualización de fotos capturadas
- Selección y eliminación de fotos
- Timestamps en cada foto

## Instalación

### Prerrequisitos
- Node.js (v16 o superior)
- npm o yarn
- Expo CLI
- Dispositivo móvil o emulador

### Pasos de Instalación

1. Clonar el repositorio:
```bash
git clone [URL_DEL_REPOSITORIO]
cd revelador
```

2. Instalar dependencias:
```bash
npm install
```

3. Instalar dependencias de Expo:
```bash
npx expo install
```

4. Iniciar la aplicación:
```bash
npm start
```

## Estructura del Proyecto

```
revelador/
├── src/
│   ├── components/          # Componentes React
│   │   ├── CameraView.js
│   │   ├── ImageProcessor.js
│   │   ├── TimelapseControls.js
│   │   ├── ScheduledCapture.js
│   │   ├── PhotoGallery.js
│   │   ├── CaptureStats.js
│   │   ├── AppSettings.js
│   │   └── ErrorBoundary.js
│   ├── hooks/              # Hooks personalizados
│   │   ├── useCamera.js
│   │   ├── useTimelapse.js
│   │   ├── useImageProcessor.js
│   │   └── useScheduledCapture.js
│   ├── screens/            # Pantallas
│   │   └── MainScreen.js
│   └── utils/              # Utilidades
│       ├── config.js
│       ├── storage.js
│       ├── dateUtils.js
│       ├── fileUtils.js
│       └── styles.js
├── assets/                 # Assets estáticos
├── App.js                  # Archivo principal
├── package.json            # Dependencias
└── DOCUMENTATION.md        # Este archivo
```

## Uso

### Captura Simple
1. Abrir la app
2. Apuntar con la cámara
3. Presionar "Capturar Negativo"
4. La foto se procesará automáticamente con el filtro de inversión

### Timelapse
1. Configurar el intervalo deseado (en milisegundos)
2. Presionar "Iniciar Timelapse"
3. Las fotos se capturarán automáticamente
4. Presionar "Detener Timelapse" cuando quieras parar

### Captura Programada
1. Ir a "Captura Programada"
2. Configurar intervalo (en minutos)
3. Establecer hora de inicio y fin
4. Presionar "Iniciar Programación"
5. La app capturará fotos automáticamente en el horario configurado

### Galería
1. Presionar "Ver Galería" después de capturar fotos
2. Seleccionar una foto para verla en detalle
3. Usar el botón de eliminar para borrar fotos

## Configuración

### Dependencias Principales
- `react-native-vision-camera`: Para acceso a la cámara
- `react-native-image-filter-kit`: Para filtros de imagen
- `expo-notifications`: Para notificaciones programadas
- `expo-file-system`: Para manejo de archivos
- `expo-media-library`: Para guardar fotos en la galería

### Permisos Requeridos
- Cámara
- Almacenamiento
- Notificaciones

## Desarrollo

### Scripts Disponibles
- `npm start`: Iniciar Expo
- `npm run android`: Ejecutar en Android
- `npm run ios`: Ejecutar en iOS
- `npm run web`: Ejecutar en web

### Estructura de Componentes
- **CameraView**: Maneja la vista de la cámara
- **ImageProcessor**: Procesa y muestra fotos con filtros
- **TimelapseControls**: Controles para captura periódica
- **ScheduledCapture**: Configuración de captura programada
- **PhotoGallery**: Muestra galería de fotos
- **CaptureStats**: Muestra estadísticas de captura
- **AppSettings**: Configuración de la aplicación

## Mejoras Futuras

1. **Filtros Adicionales**: Agregar más filtros de imagen
2. **Exportación**: Compartir fotos directamente
3. **Sincronización**: Sincronizar con servicios en la nube
4. **IA**: Análisis automático de fotos
5. **Modo Noche**: Mejorar capturas en baja luz
6. **Exportación de Video**: Crear videos timelapse

## Solución de Problemas

### Errores Comunes

**Error de permisos de cámara**
- Verificar que los permisos estén concedidos en configuración del dispositivo

**Error de almacenamiento**
- Verificar espacio disponible en el dispositivo

**Error de notificaciones**
- Verificar que las notificaciones estén habilitadas para la app

## Licencia

Este proyecto está bajo la licencia MIT.

## Contacto

Para preguntas o sugerencias, contactar a [TU_EMAIL].