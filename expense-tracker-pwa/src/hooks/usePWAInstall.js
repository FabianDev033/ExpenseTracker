import { useEffect, useState } from 'react';

function isStandalone() {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    navigator.standalone === true
  );
}

export default function usePWAInstall() {
  const [promptEvent, setPromptEvent] = useState(
    /** @type {BeforeInstallPromptEvent | null} */ (null),
  );
  const [installed, setInstalled] = useState(isStandalone);
  const [installing, setInstalling] = useState(false);
  const [error, setError] = useState('');
  const isIOS =
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

  useEffect(() => {
    const displayMode = window.matchMedia('(display-mode: standalone)');
    /** @param {BeforeInstallPromptEvent} event */
    function handlePrompt(event) {
      event.preventDefault();
      setPromptEvent(event);
    }
    function handleInstalled() {
      setInstalled(true);
      setPromptEvent(null);
    }
    function handleDisplayMode() {
      setInstalled(isStandalone());
    }
    window.addEventListener('beforeinstallprompt', handlePrompt);
    window.addEventListener('appinstalled', handleInstalled);
    displayMode.addEventListener('change', handleDisplayMode);
    return () => {
      window.removeEventListener('beforeinstallprompt', handlePrompt);
      window.removeEventListener('appinstalled', handleInstalled);
      displayMode.removeEventListener('change', handleDisplayMode);
    };
  }, []);

  async function install() {
    if (!promptEvent || installing) return;
    setInstalling(true);
    setError('');
    try {
      await promptEvent.prompt();
      await promptEvent.userChoice;
      setPromptEvent(null);
    } catch {
      setError('No se pudo abrir la instalación. Podés usar el menú del navegador.');
      setPromptEvent(null);
    } finally {
      setInstalling(false);
    }
  }

  return {
    canInstall: !installed && !!promptEvent,
    showIOSInstructions: isIOS && !installed,
    installing,
    error,
    install,
  };
}
