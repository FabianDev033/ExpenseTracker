# ExpenseTracker PWA

Versión web del Sprint 2, independiente de la aplicación Expo de la raíz.

Requiere Node.js 22.12 o superior y pnpm 12.

Desde esta carpeta:

```sh
pnpm install
pnpm dev
pnpm lint
pnpm typecheck
pnpm build
pnpm preview
```

Para probar la interfaz desde un teléfono en la misma red: `pnpm dev --host`.
La instalación y el Service Worker en un teléfono requieren HTTPS.


## Estructura y migración

`src/pages` contiene pantallas; `components`, piezas reutilizables; `router` y `layouts` reemplazan stack y tabs. `hooks` contiene instalación y acceso al modal; `data` mantiene los tres gastos del Sprint 1, ampliados con fechas y notas ficticias; `styles` contiene CSS. El estado del modal vive en MainLayout, sin dependencias de estado global.

Se conservan Lato, paleta, iconos de navegación y estilo del proyecto native. Los iconos de instalación derivan del nuevo `src/assets/icon.png` de Expo. Las fuentes se sirven localmente para funcionar offline.

El formulario confirma el envío en pantalla, pero no persiste gastos. Ajustes conserva el placeholder de la versión native.

## Producción y offline

Ejecutar `pnpm build` y `pnpm preview --host 127.0.0.1`. En localhost el navegador permite Service Workers. El worker no se activa en `pnpm dev`.

1. Abrir la app online una vez y esperar al Service Worker activo en Application → Service Workers.
2. Confirmar HTML, JS, CSS, fuentes e iconos en Cache Storage.
3. Activar Offline y recargar `/expenses/2`. Debe verse Combustible y permitir navegar a Inicio, Gastos y Ajustes.
4. Comprobar `/expenses/no-existe` y volver al listado.

El precache cubre los recursos estáticos; no hay API ni almacenamiento de gastos. Sólo existe `public/manifest.json`: el plugin usa `manifest: false`.

## Publicación HTTPS

- **URL pública:** https://expense-tracker-pwa-chi.vercel.app/

Elegir `expense-tracker-pwa` como directorio raíz en Vercel o Netlify. Build: `pnpm build`; salida: `dist`. Se incluyen reglas SPA para que `/expenses/:id` funcione al recargar y el worker se actualice sin caché HTTP persistente.

En Android/Chrome el botón **Instalar App** aparece cuando el navegador ofrece la instalación. En iOS se muestran instrucciones de Safari, salvo que ya esté abierta desde la pantalla de inicio. La disponibilidad depende del navegador y de que la app todavía no esté instalada.

## Demo en teléfono y comparativa con Expo Go

Instalación en dispositivo móvil y ejecución en modo `standalone` (sin barra del navegador):

![Demo PWA instalada](docs/pwa-demo.gif)

| Pantalla | React Native (Expo Go) | PWA (React + Vite) |
| --- | --- | --- |
| Inicio | ![Inicio Expo](../docs-utils/s6-demo-inicio.jpeg) | ![Inicio PWA](docs/home-mobile.png) |
| Listado de gastos | ![Gastos Expo](../docs-utils/s6-demo-gastos.jpeg) | ![Gastos PWA](docs/expenses-mobile.png) |
| Nuevo gasto (modal) | — | ![Modal PWA](docs/modal-mobile.png) |

## Tabla comparativa: React Native vs PWA

| Aspecto | React Native (Expo) | PWA (React + Vite) |
| --- | --- | --- |
| **Distribución e instalación** | Requiere Expo Go en desarrollo o compilación (`.apk`/`.ipa`) para tiendas. | Se distribuye por URL HTTPS y se instala desde el navegador con `manifest.json`. |
| **Navegación** | React Navigation (`TabNavigator` + `StackNavigator` con `presentation: 'modal'`). | React Router (`MainLayout` con `<Outlet>` + `<NavLink>`) y `<dialog>` con `createPortal` para modales. |
| **Estilos y layout** | `StyleSheet` / NativeWind (`View`, `Text`, `Pressable`) y `SafeAreaView`. | HTML semántico (`header`, `main`, `section`), CSS estándar con Flexbox, `100dvh` y `env(safe-area-inset-*)`. |
| **Modo offline** | El bundle JS corre local en el dispositivo de forma nativa. | Service Worker (`vite-plugin-pwa` + Workbox) pre-cachea HTML, CSS, JS, fuentes e íconos. |
| **Deep linking y URL** | Navegación por nombres de ruta y parámetros en memoria (`route.params`). | La URL es la fuente de verdad (`/expenses/:id` con `useParams()`), recargable con rewrites SPA. |
| **Experiencia en iOS/Android** | Comportamiento nativo uniforme en ambas plataformas. | En Android soporta `beforeinstallprompt`; en iOS requiere instalación manual desde Safari (*Agregar a inicio*). |

## Lighthouse

El informe y la captura de la auditoría local se guardan en `docs/` cuando se ejecuta la verificación. La auditoría del despliegue HTTPS y la instalación en un teléfono real siguen pendientes.


Auditoría local Mobile en Microsoft Edge (Chromium), 2026-10-30. Rendimiento: 100; accesibilidad: 100; buenas prácticas: 100; SEO: 100. Los resultados corresponden a localhost y no verifican la instalación en un dispositivo real.

![Lighthouse Mobile](docs/lighthouse-mobile.png)

[Informe completo](docs/lighthouse-mobile.report.html) · [Resultado JSON](docs/lighthouse-mobile.report.json) · [Pruebas en navegador](docs/browser-checks.json)
