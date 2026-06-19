# Changelog

## [1.2.0] - 2026-06-19

### Added
- Editor de capas de imagen con soporte para múltiples capas
- Efectos especiales (blur, sharpen, vignette, noise, glitch, pixelate, mirror, kaleidoscope)
- Selector de algoritmo de compresión (JPEG, PNG, WebP, HEIF)
- Visor de metadatos de imagen
- Optimizador web con imágenes responsivas
- Conversor de formatos de imagen
- Selector de calidad de imagen con presets
- Editor de capas con visibilidad y opacidad
- Sistema de caché de imágenes
- Información de caché en configuración
- Sincronización con Firebase
- Autenticación con Firebase
- Tareas en segundo plano
- Configuración de tareas en segundo plano
- Captura programada mejorada con notificaciones
- Historial de capturas
- Estadísticas de captura detalladas
- Configuración de la aplicación completa
- Exportación a múltiples destinos (galería, compartir, backup, documentos)
- Compressión de imagen con diferentes algoritmos
- Edición de metadatos de imagen
- Soporte para múltiples formatos de imagen

### Changed
- Mejora significativa de la interfaz de usuario
- Reestructuración completa del proyecto
- Mejora de rendimiento en procesamiento de imágenes
- Optimización de memoria y recursos
- Mejora del manejo de errores
- Actualización de dependencias
- Mejora de la documentación

### Fixed
- Corrección de problemas de memoria con múltiples filtros
- Corrección de problemas de rendimiento en tiempo real
- Corrección de problemas de compatibilidad con dispositivos
- Corrección de problemas de permisos en Android 13+
- Corrección de problemas de guardado en galería
- Corrección de problemas de notificaciones programadas

## [1.1.0] - 2026-06-19

### Added
- Sistema de captura periódica (timelapse) con intervalos configurables
- Captura programada por horario con notificaciones
- Galería de fotos con visualización y eliminación
- Estadísticas de captura
- Configuración de la aplicación
- Filtro de inversión de colores real usando react-native-image-filter-kit
- Manejo de errores con ErrorBoundary
- Utilidades para manejo de fechas, archivos y almacenamiento
- Hooks personalizados para lógica reutilizable
- Documentación completa del proyecto
- Configuración de ESLint y Prettier
- Archivo .gitignore completo

### Changed
- Reestructuración completa del proyecto
- Mejora de componentes existentes
- Actualización de dependencias
- Mejora de estilos y UI/UX

### Fixed
- Corrección del filtro de inversión de colores (antes era simulado)
- Corrección de permisos de cámara
- Mejora del manejo de errores

## [1.0.0] - 2026-06-18

### Added
- Captura básica de fotos
- Simulación de filtro de inversión
- Interfaz básica de usuario

### Known Issues
- Filtro de inversión no funcionaba realmente
- No había persistencia de datos
- UI básica sin estilos avanzados