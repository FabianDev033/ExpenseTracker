# Persistencia y funcionamiento offline

## Objetivo

Comprobar cómo se comportan las aplicaciones Native y PWA cuando pierden la conexión a internet, cómo gestionan los gastos creados sin conexión y si conservan los datos después de cerrar y volver a abrir la aplicación.

Ambas aplicaciones utilizan **Cloud Firestore** como fuente compartida de datos. Esto permite sincronizar los gastos entre dispositivos y plataformas.

## Configuración de persistencia

### React Native

La conexión con Firestore se inicializa mediante `getFirestore(app)` en `src/services/firebase.ts`.

Los gastos se gestionan desde `src/features/expenses/expenseRepository.ts`, utilizando:

- `onSnapshot()` para escuchar los cambios de la colección `expenses`.
- `addDoc()` para crear gastos.
- `deleteDoc()` para eliminar gastos.

No se configura explícitamente una caché persistente para Firestore.

### PWA

La conexión se inicializa en `expense-tracker-pwa/src/services/firebase.js`.

A diferencia de Native, utiliza `initializeFirestore()` con `persistentLocalCache()`. Esto habilita una caché local persistente en el navegador, que permite conservar datos y escrituras pendientes entre sesiones.

El repositorio `expense-tracker-pwa/src/features/expenses/expenseRepository.js` utiliza las mismas operaciones de Firestore que Native.

## Pruebas de persistencia offline

Se realizaron cuatro pruebas en cada aplicación.

### Resultados

| Prueba | Native | PWA |
|---|---|---|
| 1. Crear un gasto sin conexión | Correcto. Aparece en el listado local. | Correcto. Aparece en el listado. |
| 2. Recuperar la conexión | Correcto. Los gastos se sincronizan entre ambas aplicaciones. | Correcto. Los gastos se sincronizan entre ambas aplicaciones. |
| 3. Crear un gasto offline, cerrar y volver a abrir | El gasto nuevo no se conserva. | El gasto nuevo se conserva. |
| 4. Abrir desde cero sin conexión | Se muestran los gastos anteriores. | Se muestran los gastos anteriores. |

La sincronización entre aplicaciones presentó una demora aproximada de entre 5 y 10 segundos.

### Detalle de las pruebas

**Prueba 1 — Creación sin conexión**

Se deshabilitó la conexión a internet y se creó un gasto desde cada aplicación.

En ambos casos, el gasto apareció en el listado de la aplicación utilizada, aunque todavía no estaba sincronizado con la otra plataforma.

**Prueba 2 — Sincronización al recuperar la conexión**

Se recuperó la conexión a internet en ambas aplicaciones.

Los gastos creados durante el modo offline se sincronizaron correctamente y aparecieron en la otra aplicación después de unos segundos.

**Prueba 3 — Cierre y reapertura sin conexión**

Se creó un gasto sin conexión, se cerró completamente la aplicación y luego se volvió a abrir.

- En Native, el gasto creado durante la sesión offline no se conservó después de cerrar la aplicación.
- En PWA, el gasto permaneció disponible después de cerrar y volver a abrir la pestaña, incluso sin conexión.

**Prueba 4 — Inicio desde cero sin conexión**

Se cerraron las aplicaciones y se intentó abrirlas nuevamente sin conexión a internet.

En ambas se pudieron visualizar los gastos anteriores que ya estaban disponibles.

## Análisis de las diferencias

La principal diferencia está en la configuración de la caché de Firestore.

En Native se utiliza `getFirestore(app)` sin configurar explícitamente una caché persistente. En cambio, la PWA utiliza `persistentLocalCache()`, que permite guardar información localmente y conservarla entre sesiones del navegador.

Esto explica el comportamiento observado en la tercera prueba: la PWA pudo recuperar el gasto pendiente después de cerrar y abrir nuevamente la pestaña, mientras que Native no pudo conservar el gasto creado durante la sesión offline.

La posibilidad de consultar gastos anteriores y la conservación de nuevas escrituras pendientes son comportamientos diferentes. Por eso, que ambas aplicaciones hayan mostrado gastos anteriores en la cuarta prueba no significa que tengan el mismo nivel de persistencia.

## Evidencias

Las capturas de las pruebas se incorporarán en la carpeta `evidencias/`, ubicada junto a este documento.

| Evidencia | Archivo |
|---|---|
| Native — creación offline | `native-prueba-1.png` |
| Native — sincronización | `native-prueba-2.png` |
| Native — cierre y reapertura | `native-prueba-3.png` |
| Native — inicio sin conexión | `native-prueba-4.png` |
| PWA — creación offline | `pwa-prueba-1.png` |
| PWA — sincronización | `pwa-prueba-2.png` |
| PWA — cierre y reapertura | `pwa-prueba-3.png` |
| PWA — inicio sin conexión | `pwa-prueba-4.png` |

## Video de sincronización

Se incorporará un video breve mostrando ambas aplicaciones abiertas simultáneamente y la sincronización de un gasto creado desde una de ellas hacia la otra.

**Estado:** pendiente de incorporar.
