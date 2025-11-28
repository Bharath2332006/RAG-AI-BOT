import { createContext, useContext, useEffect, useState } from 'react';
import { showNotification } from '@mantine/notifications';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [resumeId, setResumeId] = useState(() => localStorage.getItem('resumeId') || '');
  const [isBusy, setIsBusy] = useState(false);

  useEffect(() => {
    if (resumeId) localStorage.setItem('resumeId', resumeId);
  }, [resumeId]);

  const notify = (title, message, color = 'indigo') => {
    showNotification({ title, message, color });
  };

  return (
    <AppContext.Provider value={{ resumeId, setResumeId, isBusy, setIsBusy, notify }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
