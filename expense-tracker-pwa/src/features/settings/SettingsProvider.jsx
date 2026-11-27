import { useCallback, useEffect, useRef, useState } from 'react';
import { readSettings, saveSettings } from './settingsStorage';
import { SettingsContext } from './useSettings';

/** @param {{ children: import('react').ReactNode }} props */
export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(() => readSettings());
  const lastSavedRef = useRef(settings);

  useEffect(() => {
    if (lastSavedRef.current === settings) return;
    lastSavedRef.current = settings;
    saveSettings(settings);
  }, [settings]);

  const setNotificationsEnabled = useCallback(
    /** @param {boolean} enabled */
    (enabled) => {
      setSettings((current) => ({ ...current, notificationsEnabled: enabled }));
    },
    [],
  );

  const setDarkModeEnabled = useCallback(
    /** @param {boolean} enabled */
    (enabled) => {
      setSettings((current) => ({ ...current, darkModeEnabled: enabled }));
    },
    [],
  );

  return (
    <SettingsContext.Provider value={{ settings, setNotificationsEnabled, setDarkModeEnabled }}>
      {children}
    </SettingsContext.Provider>
  );
}
