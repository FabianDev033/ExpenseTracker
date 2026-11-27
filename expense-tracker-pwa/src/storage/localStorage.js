/**
 * Lee y parsea un valor JSON desde localStorage de forma segura.
 * Si la clave no existe, el JSON está dañado o localStorage falla, devuelve `fallback`.
 *
 * @template T
 * @param {string} key
 * @param {T} fallback
 * @returns {T}
 */
export function readStorageJSON(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null) return fallback;
    return /** @type {T} */ (JSON.parse(raw));
  } catch (error) {
    console.error(`No se pudo leer "${key}" desde localStorage:`, error);
    return fallback;
  }
}

/**
 * Serializa y guarda un valor JSON en localStorage de forma segura.
 *
 * @param {string} key
 * @param {unknown} value
 * @returns {boolean}
 */
export function writeStorageJSON(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`No se pudo guardar "${key}" en localStorage:`, error);
    return false;
  }
}
