# ExpenseTracker

## Como instalar las dependencias
- pnpm install

## Como ejecutar el proyecto
- pnpx expo start
- Una vez ejecutado el proyecto, podemos probar la aplicación descargando en la playstore ExpoGo.
- Cuando estemos dentro de ExpoGo, en la computadora en la que corrimos la app podemos escanear un QR para probar en vivo los cambios e interactuar con la aplicación, cabe destacar que el teléfono debe estar conectado a la misma red wifi que la computadora que hostea la app.

## Sprint 1: App móvil con React Native y Expo

### Manejo de navegación
- Se implementó el tab navigator con 3 tabs (Inicio, Gastos, Configuración).
- Demo de `NavigationContainer` con los `TabScreens`, `StackNavigator` y Bottom Navigation Bar.

#### Pantalla de inicio, gastos y configuración como TabScreens
- Pantalla de inicio
![Inicio](./docs-utils/s6-demo-inicio.jpeg)
- Pantalla de gastos
![Gastos](./docs-utils/s6-demo-gastos.jpeg)
- Pantalla de configuración
![Configuración](./docs-utils/s6-demo-configuracion.jpeg)

#### Demostración de StackNavigator y Navegación Anidada
- Se integró el `StackNavigator` junto con el `TabNavigator` para permitir navegación fluida entre pantallas y apertura de modales.
- Permite acceder al detalle de un gasto puntual y abrir la pantalla modal para registrar nuevos gastos.

![Demo Navegación](./docs-utils/s6-stackNavigation-demo.gif)

---

## Sprint 2: Progressive Web App (PWA)

Versión web desarrollada con React + Vite en [`expense-tracker-pwa/`](./expense-tracker-pwa) ([ver documentación completa de la PWA](./expense-tracker-pwa/README.md)).

- **URL pública (HTTPS):** https://expense-tracker-pwa-chi.vercel.app/
- **Instalación y Service Worker:** `manifest.json` configurado para modo `standalone`, precache offline con `vite-plugin-pwa` (Workbox) y reglas SPA en Vercel/Netlify.
- **Lighthouse Mobile:** 100 Performance · 100 Accessibility · 100 Best Practices · 100 SEO ([ver captura](./expense-tracker-pwa/docs/lighthouse-mobile.png)).

### Demo instalada en teléfono (`standalone`)
![Demo PWA instalada](./expense-tracker-pwa/docs/pwa-demo.gif)

### Comparativa visual: React Native vs PWA
| Pantalla | React Native (Expo Go) | PWA (React + Vite) |
| --- | --- | --- |
| Inicio | ![Inicio Expo](./docs-utils/s6-demo-inicio.jpeg) | ![Inicio PWA](./expense-tracker-pwa/docs/home-mobile.png) |
| Listado de gastos | ![Gastos Expo](./docs-utils/s6-demo-gastos.jpeg) | ![Gastos PWA](./expense-tracker-pwa/docs/expenses-mobile.png) |
| Nuevo gasto (modal) | — | ![Modal PWA](./expense-tracker-pwa/docs/modal-mobile.png) |

### Tabla comparativa: React Native vs PWA
| Aspecto | React Native (Expo) | PWA (React + Vite) |
| --- | --- | --- |
| **Distribución e instalación** | Requiere Expo Go en desarrollo o compilación (`.apk`/`.ipa`) para tiendas. | Se distribuye por URL HTTPS y se instala desde el navegador con `manifest.json`. |
| **Navegación** | React Navigation (`TabNavigator` + `StackNavigator` con `presentation: 'modal'`). | React Router (`MainLayout` con `<Outlet>` + `<NavLink>`) y `<dialog>` con `createPortal` para modales. |
| **Estilos y layout** | `StyleSheet` / NativeWind (`View`, `Text`, `Pressable`) y `SafeAreaView`. | HTML semántico (`header`, `main`, `section`), CSS estándar con Flexbox, `100dvh` y `env(safe-area-inset-*)`. |
| **Modo offline** | El bundle JS corre local en el dispositivo de forma nativa. | Service Worker (`vite-plugin-pwa` + Workbox) pre-cachea HTML, CSS, JS, fuentes e íconos. |
| **Deep linking y URL** | Navegación por nombres de ruta y parámetros en memoria (`route.params`). | La URL es la fuente de verdad (`/expenses/:id` con `useParams()`), recargable con rewrites SPA. |
| **Experiencia en iOS/Android** | Comportamiento nativo uniforme en ambas plataformas. | En Android soporta `beforeinstallprompt`; en iOS requiere instalación manual desde Safari (*Agregar a inicio*). |