import usePWAInstall from '../hooks/usePWAInstall';

export default function InstallBanner() {
  const { canInstall, showIOSInstructions, install, installing, error } = usePWAInstall();
  if (!canInstall && !showIOSInstructions && !error) return null;
  return (
    <aside className="install-banner" aria-label="Instalar ExpenseTracker">
      <img src="/icons/icon-192.png" width="44" height="44" alt="" />
      <div>
        <p>
          <strong>ExpenseTracker en tu teléfono</strong>
        </p>
        {showIOSInstructions ? (
          <p className="muted">
            Abrí esta página en Safari y tocá Compartir → Agregar a la pantalla de inicio.
          </p>
        ) : (
          <p className="muted">Accedé desde tu pantalla de inicio.</p>
        )}
        {error && <p role="status">{error}</p>}
      </div>
      {canInstall && (
        <button className="button" onClick={install} disabled={installing}>
          {installing ? 'Abriendo…' : 'Instalar App'}
        </button>
      )}
    </aside>
  );
}
