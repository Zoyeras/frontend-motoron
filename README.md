# MotorON PWA Frontend 📱

Este es el frontend de la solución PWA MotorON, desarrollada con React, TypeScript y Vite. La aplicación está diseñada como un Panel de Control / Dashboard para llevar registro del historial de uso del vehículo sin preocuparse de la conectividad.

## 🛠 Entorno de Desarrollo y Estructura

El frontend consume la API del proyecto base. Está construido sobre **Vite** para desarrollo y empaquetado ultra-rápido, y los estilos se aplican vía `App.css` (Glassmorphism de tema oscuro).

Los módulos básicos:
- **`src/App.tsx`:** Dashboard Principal e inyección visual.
- **`src/services/apiClient.ts`:** Wrapper REST genérico para el backend.
- **PWA Offline Ready:** Cuenta con Manifest y configuración de Service Worker base (actualmente estático pero ampliable).

### Requisitos Mínimos
- Node.js (18 o superior)
- Navegador moderno como Chrome, Edge (para características PWA nativas)

---

## 🏃‍♀️ Levantar el Frontend Local

Asegúrate de tener funcionando tu servidor PostgreSQL y tu API de C# (`backend-motoron`) antes de correr estos comandos para evitar errores de conexión (`404` / `CORS`).

```bash
# 1. Instala los paquetes y dependencias NPM a partir del `package.json`
npm install

# 2. Configura tu entorno
# Asegúrate de crear `.env` siguiendo `.env.example`
# VITE_API_URL=http://localhost:5014/api

# 3. Arranca el entorno de desarrollo
npm run dev
```

Esto alzará el proyecto en [http://localhost:5173/](http://localhost:5173/).

## 🌟 Características Destacadas
- **Indicador Dinámico en Tiempo Real**: Cálculo visual del próximo cambio de aceite (Predictivo).
- **Glassmorphism**: Apariencia moderna lista para móviles y tabletas sin librerías pesadas CSS.
- **Recargas sin Fricciones**: Promesas `useEffect` y peticiones limpias a los enrutadores C#.

## 🤝 Comandos Útiles

- `npm run dev` para el servidor de desarrollo Vite con Hot Module Replacement (HMR).
- `npm run build` para producción (compilar y generar el bundle final de la app de React en `/dist`).
- `npm run preview` para probar el build generado en tu servidor local.
