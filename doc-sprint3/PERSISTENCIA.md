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
