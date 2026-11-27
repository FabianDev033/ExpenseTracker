import { useSettings } from '../features/settings/useSettings';
import '../styles/settings.css';

export default function SettingsScreen() {
  const { settings, setNotificationsEnabled, setDarkModeEnabled } = useSettings();

  return (
    <section className="settings-screen" aria-labelledby="settings-title">
      <header>
        <h2 id="settings-title">Preferencias</h2>
      </header>

      <div className="settings-card">
        <div className="settings-row">
          <div className="settings-info">
            <label htmlFor="setting-notifications">Notificaciones</label>
            <p className="muted">Recordar esta preferencia en el dispositivo.</p>
          </div>
          <input
            id="setting-notifications"
            className="switch-input"
            type="checkbox"
            role="switch"
            checked={settings.notificationsEnabled}
            onChange={(event) => setNotificationsEnabled(event.target.checked)}
          />
        </div>

        <div className="settings-row">
          <div className="settings-info">
            <label htmlFor="setting-dark-mode">Modo oscuro</label>
            <p className="muted">Recordar esta preferencia en el dispositivo.</p>
          </div>
          <input
            id="setting-dark-mode"
            className="switch-input"
            type="checkbox"
            role="switch"
            checked={settings.darkModeEnabled}
            onChange={(event) => setDarkModeEnabled(event.target.checked)}
          />
        </div>
      </div>

      <p className="muted settings-note">
        Estas opciones guardan tu preferencia localmente. Su efecto en la app se puede conectar más
        adelante.
      </p>
    </section>
  );
}
