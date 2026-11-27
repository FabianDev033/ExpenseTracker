# Persistencia local

La app conserva los gastos y las preferencias en el dispositivo con AsyncStorage. Esta persistencia es local: los datos no se sincronizan con una cuenta ni con otros dispositivos.

## Claves de almacenamiento

Las claves están centralizadas en `src/storage/storageKeys.ts`:

- `@expensetracker/expenses`: arreglo de gastos serializado como JSON.
- `@expensetracker/settings`: objeto de preferencias serializado como JSON.

## Gastos

`ExpensesProvider` carga los gastos al montarse. Lee la clave con `getItem`, convierte el resultado con `JSON.parse` y marca `isLoaded` al terminar. `ExpenseList` muestra un indicador de carga mientras `isLoaded` es `false`.

Otro efecto guarda `expenses` con `setItem` cada vez que cambia la lista. La condición `if (!isLoaded) return` evita guardar el arreglo inicial vacío antes de completar la lectura. El formulario agrega gastos mediante `addExpense`, y el provider los persiste después del cambio de estado.

## Ajustes

`SettingsProvider` carga y guarda un objeto con estas propiedades:

- `notificationsEnabled`
- `darkModeEnabled`

Ambas opciones empiezan desactivadas si todavía no hay preferencias guardadas. La pantalla de Ajustes presenta los dos switches y muestra un indicador mientras se cargan. Por ahora, los switches guardan la preferencia; todavía no activan notificaciones ni cambian el tema visual.

El guardado de ajustes espera a que termine la hidratación. Si falla la lectura de AsyncStorage, no intenta guardar los valores por defecto sobre los datos existentes.

## Manejo de errores

Las operaciones de lectura y escritura esperan sus promesas con `await` y manejan errores con `try/catch`. Los errores se registran en consola para facilitar el diagnóstico.

## Error común: guardar antes de hidratar

Si se quita temporalmente la guardia `if (!isLoaded) return` del efecto que guarda los gastos, ese efecto puede intentar guardar `[]` desde el primer render mientras `getItem` todavía está leyendo los datos existentes. Si la escritura vacía termina primero, puede reemplazar la lista guardada y hacer que los gastos desaparezcan al reabrir la app.

Para reproducir el caso de forma controlada, conservá al menos un gasto guardado, quitá la guardia solo durante la prueba y reiniciá la app. Una demora temporal antes de la lectura puede ayudar a exponer la carrera. Después de observar el resultado, restaurá la guardia. **No dejes el efecto sin esa condición.**

## Validación manual

La persona desarrolladora probó la app en un celular y reportó que los datos persisten correctamente al cerrarla y volver a abrirla. La reproducción deliberada del error de hidratación descrito arriba es una prueba separada: debe hacerse solo de forma temporal y restaurar la guardia al terminar.

---

## Persistencia local en la PWA (`localStorage`)

En la versión PWA (`expense-tracker-pwa/`), los gastos y las preferencias del usuario se persisten localmente en el navegador mediante `window.localStorage`.

### Claves y capa de almacenamiento

- **Claves compartidas:** se reutilizan exactamente las mismas claves que en React Native, definidas en `expense-tracker-pwa/src/storage/storageKeys.js`:
  - `@expensetracker/expenses`: arreglo de gastos serializado en JSON.
  - `@expensetracker/settings`: objeto `{ notificationsEnabled, darkModeEnabled }` serializado en JSON.
- **Acceso seguro (`try/catch`):** `expense-tracker-pwa/src/storage/localStorage.js` encapsula `readStorageJSON` y `writeStorageJSON` en bloques `try/catch` para registrar errores en consola y evitar que la aplicación falle si `localStorage` no está disponible o si el JSON almacenado está dañado.
- **Validación de estructura:** `expenseStorage.js` verifica que el contenido leído sea un arreglo de gastos válidos (ante JSON corrupto o formato inesperado, la app arranca con `[]` sin romperse). De forma análoga, `settingsStorage.js` valida que cada preferencia sea booleana y aplica `false` por defecto ante datos dañados o incompletos.

### Hidratación síncrona en los providers y rutas profundas

- `ExpensesProvider` y `SettingsProvider` leen los datos de forma **síncrona** usando el inicializador perezoso de `useState`:
  - `useState(() => readExpenses())`
  - `useState(() => readSettings())`
- Los cambios posteriores se persisten en un `useEffect` que compara con una `ref` del último valor guardado para evitar escrituras redundantes en el primer render.
- **Rutas profundas (`/expenses/:id`):** como los gastos ya están hidratados desde el primer render, recargar directamente una URL como `/expenses/<id>` encuentra el movimiento de inmediato sin pasar por un estado vacío ni mostrar falsamente "Gasto no encontrado".
- **Ajustes:** `SettingsScreen` renderiza dos controles `<input type="checkbox" role="switch">` accesibles para **Notificaciones** y **Modo oscuro**, sincronizados con `SettingsProvider`.

### Comparativa: `localStorage` (PWA) vs. `AsyncStorage` (React Native)

| Aspecto | React Native (`AsyncStorage`) | PWA (`localStorage`) |
| --- | --- | --- |
| Naturaleza de la API | Asíncrona (`Promise` con `async`/`await`) | Síncrona (bloqueante, devuelve el valor al instante) |
| Lectura inicial | Dentro de `useEffect` tras el primer render | Directamente en `useState(() => leerDatos())` |
| Bandera `isLoaded` | Necesaria para mostrar carga y evitar sobrescritura | No es necesaria: el dato existe desde el primer render |
| Primer render | Vacío / indicador de carga hasta completar lectura | Renderiza directamente los datos persistidos |
| Riesgo de guardar `[]` antes de hidratar | Alto si se omite la guardia `if (!isLoaded) return` | Inexistente, porque la lectura ocurre antes del primer `useEffect` |

### ¿Por qué con `AsyncStorage` no se puede usar `useState(() => leerGastos())`?

El inicializador perezoso de React (`useState(() => valorInicial)`) **debe ser síncrono**: React ejecuta esa función durante el primer render y toma su valor de retorno directamente como el estado inicial del componente.

- En la **PWA**, `localStorage.getItem(...)` es síncrono y devuelve el string JSON en el acto, por lo que `readExpenses()` puede parsearlo y devolver `Expense[]` de forma inmediata sin render vacío.
- En **React Native**, `AsyncStorage.getItem(...)` es **asíncrono** porque se comunica con el almacenamiento nativo fuera del hilo de JavaScript y devuelve una `Promise<string | null>`. Si se pasara una función `async` a `useState`, el estado inicial quedaría asignado a un objeto `Promise` en lugar del arreglo de gastos, rompiendo cualquier operación de lista (`.map`, `.reduce`, `.find`).

Por ese motivo, en React Native es obligatorio iniciar con `[]` y `isLoaded = false`, cargar los datos dentro de un `useEffect` con `await` y proteger la escritura con `if (!isLoaded) return`. En la PWA, en cambio, la lectura síncrona en `useState` resuelve la hidratación en el primer render de manera más simple y sin condiciones de carrera.

