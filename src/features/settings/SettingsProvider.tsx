import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { STORAGE_KEYS } from '../../storage/storageKeys';

export interface AppSettings {
  notificationsEnabled: boolean;
  darkModeEnabled: boolean;
}

interface SettingsState {
  settings: AppSettings;
  isLoaded: boolean;
  canPersist: boolean;
}

interface SettingsContextValue {
  settings: AppSettings;
  isLoaded: boolean;
  setNotificationsEnabled: (enabled: boolean) => void;
  setDarkModeEnabled: (enabled: boolean) => void;
}

const DEFAULT_SETTINGS: AppSettings = {
  notificationsEnabled: false,
  darkModeEnabled: false,
};

const SettingsContext = createContext<SettingsContextValue | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<SettingsState>({
    settings: DEFAULT_SETTINGS,
    isLoaded: false,
    canPersist: false,
  });

  useEffect(() => {
    let isMounted = true;

    const loadSettings = async () => {
      try {
        const savedSettings = await AsyncStorage.getItem(STORAGE_KEYS.settings);
        let loadedSettings = DEFAULT_SETTINGS;

        if (savedSettings !== null) {
          try {
            const parsedSettings = JSON.parse(savedSettings) as Partial<AppSettings> | null;

            if (parsedSettings && typeof parsedSettings === 'object') {
              loadedSettings = {
                notificationsEnabled:
                  typeof parsedSettings.notificationsEnabled === 'boolean'
                    ? parsedSettings.notificationsEnabled
                    : DEFAULT_SETTINGS.notificationsEnabled,
                darkModeEnabled:
                  typeof parsedSettings.darkModeEnabled === 'boolean'
                    ? parsedSettings.darkModeEnabled
                    : DEFAULT_SETTINGS.darkModeEnabled,
              };
            }
          } catch (error) {
            console.error('No se pudieron interpretar los ajustes guardados:', error);
          }
        }

        if (isMounted) {
          setState({ settings: loadedSettings, isLoaded: true, canPersist: true });
        }
      } catch (error) {
        console.error('No se pudieron cargar los ajustes:', error);
        if (isMounted) {
          setState((currentState) => ({ ...currentState, isLoaded: true }));
        }
      }
    };

    void loadSettings();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!state.isLoaded || !state.canPersist) return;

    const saveSettings = async () => {
      try {
        await AsyncStorage.setItem(
          STORAGE_KEYS.settings,
          JSON.stringify(state.settings),
        );
      } catch (error) {
        console.error('No se pudieron guardar los ajustes:', error);
      }
    };

    void saveSettings();
  }, [state.settings, state.isLoaded, state.canPersist]);

  const setNotificationsEnabled = (enabled: boolean) => {
    setState((currentState) => ({
      ...currentState,
      settings: { ...currentState.settings, notificationsEnabled: enabled },
    }));
  };

  const setDarkModeEnabled = (enabled: boolean) => {
    setState((currentState) => ({
      ...currentState,
      settings: { ...currentState.settings, darkModeEnabled: enabled },
    }));
  };

  return (
    <SettingsContext.Provider
      value={{
        settings: state.settings,
        isLoaded: state.isLoaded,
        setNotificationsEnabled,
        setDarkModeEnabled,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);

  if (!context) {
    throw new Error('useSettings debe usarse dentro de SettingsProvider');
  }

  return context;
}
