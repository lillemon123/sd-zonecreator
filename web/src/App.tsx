import React, { useState, useEffect } from 'react';
import './App.css';
import ZoneCreator from './components/ZoneCreator';

const GetParentResourceName = (): string => {
  if (window.GetParentResourceName) {
    return window.GetParentResourceName();
  }
  return 'sd-zonecreator';
};

const App: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const { action, data } = event.data;

      switch (action) {
        case 'showZoneCreator':
          setVisible(true);
          break;
        case 'hideZoneCreator':
          setVisible(false);
          break;
        case 'copyToClipboard':
          if (data?.text) {
            navigator.clipboard.writeText(data.text).catch(console.error);
          }
          break;
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && visible) {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [visible]);

  const handleClose = () => {
    setVisible(false);
    fetch(`https://${GetParentResourceName()}/closeZoneCreator`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    }).catch(() => {});
  };

  if (!visible) return null;

  return <ZoneCreator onClose={handleClose} />;
};

export default App;
