import React, { useEffect, useState } from 'react';
import { ipcRenderer } from 'electron';

// type Props = {};
type Event = React.MouseEvent<HTMLButtonElement, MouseEvent>;

const Updater: React.FC = () => {
  const [version, setVersion] = useState('Version ');
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    ipcRenderer.send('app_version');
  }, []);

  ipcRenderer.on('app_version', (event, arg) => {
    ipcRenderer.removeAllListeners('app_version');
    setVersion(`Version ${arg.version}`);
  });

  ipcRenderer.on('update_available', () => {
    ipcRenderer.removeAllListeners('update_available');
    setMessage('A new update is available. Downloading now...');
  });

  ipcRenderer.on('update_downloaded', () => {
    ipcRenderer.removeAllListeners('update_downloaded');
    setMessage(
      'Update Downloaded. It will be installed on restart. Restart now?'
    );
  });

  const closeNotification = (e: Event) => {
    console.log('close', e.target);
  };

  const restartApp = (e: Event) => {
    console.log('restart', e.target);
    ipcRenderer.send('restart_app');
  };

  return (
    <div>
      <p>{version}</p>
      <div id="notification" className="hidden">
        <p id="message" />
        {message && <p>{message}</p>}
        <button type="button" id="close-button" onClick={closeNotification}>
          Close
        </button>
        <button
          type="button"
          id="restart-button"
          onClick={restartApp}
          className="hidden"
        >
          Restart
        </button>
      </div>
    </div>
  );
};

export default Updater;
