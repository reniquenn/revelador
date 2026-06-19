# Revelador

App de captura y procesamiento de fotos con filtros de inversión de colores para revelar negativos.

## Características

- **Captura de Fotos**: Cámara en tiempo real con captura instantánea
- **Procesamiento de Imágenes**: Filtro de inversión de colores (negativo a positivo)
- **Timelapse**: Captura automática a intervalos configurables
- **Captura Programada**: Programación de capturas por horario
- **Galería**: Visualización y gestión de fotos capturadas
- **Estadísticas**: Conteo de capturas y tiempos

## Instalación

### Prerrequisitos

- Node.js (v16 o superior)
- npm o yarn
- Expo CLI
- Dispositivo móvil o emulador

### Pasos

1. Clonar el repositorio:
```bash
git clone [URL_DEL_REPOSITORIO]
cd revelador
```

2. Instalar dependencias:
```bash
npm install
```

3. Iniciar la aplicación:
```bash
npm start
```

4. Escanear el código QR con Expo Go (iOS/Android)

## Uso

### Captura Simple
1. Abrir la app
2. Apuntar con la cámara
3. Presionar "Capturar Negativo"
4. La foto se procesará automáticamente

### Timelapse
1. Configurar el intervalo (en milisegundos)
2. Presionar "Iniciar Timelapse"
3. Las fotos se capturarán automáticamente
4. Presionar "Detener Timelapse" para parar

### Captura Programada
1. Ir a "Captura Programada"
2. Configurar intervalo y horario
3. Presionar "Iniciar Programación"

### Galería
1. Presionar "Ver Galería"
2. Seleccionar foto para ver en detalle
3. Usar botón de eliminar para borrar

## Tecnologías

- **React Native** con Expo
- **react-native-vision-camera**: Acceso a cámara
- **react-native-image-filter-kit**: Filtros de imagen
- **expo-notifications**: Notificaciones
- **expo-file-system**: Manejo de archivos
- **expo-media-library**: Galería de fotos

## Estructura del Proyecto

```
revelador/
├── src/
│   ├── components/     # Componentes React
│   ├── hooks/         # Hooks personalizados
│   ├── screens/       # Pantallas
│   └── utils/         # Utilidades
├── assets/            # Assets estáticos
├── App.js             # Archivo principal
└── package.json       # Dependencias
```

## Desarrollo

### Scripts

- `npm start`: Iniciar Expo
- `npm run android`: Ejecutar en Android
- `npm run ios`: Ejecutar en iOS
- `npm run web`: Ejecutar en web

### Calidad de Código

```bash
# Linting
npm run lint

# Formateo
npx prettier --write "src/**/*.js"
```

## Mejoras Futuras

1. Filtros adicionales de imagen
2. Exportación y compartir fotos
3. Sincronización con la nube
4. Análisis con IA
5. Modo nocturno mejorado
6. Exportación de videos timelapse

## Licencia

MIT License

## Contacto

[TU_EMAIL] - [TU_GITHUB]