import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { darkTheme, lightTheme } from '../constants/theme';

const STORAGE_KEY = '@mobile-computing-portfolio/theme';
const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState('light');
  const [isReady, setIsReady] = useState(false);
  const [storageError, setStorageError] = useState('');
  const saveQueue = useRef(Promise.resolve());
  const setThemeMode = useCallback((nextMode) => {
    if (nextMode !== 'light' && nextMode !== 'dark') {
      throw new Error('Theme mode must be either "light" or "dark".');
    }

    setMode(nextMode);
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function loadTheme() {
      try {
        const savedMode = await AsyncStorage.getItem(STORAGE_KEY);
        if (isMounted && (savedMode === 'light' || savedMode === 'dark')) {
          setMode(savedMode);
        }
      } catch (error) {
        if (isMounted) {
          setStorageError('Your saved theme could not be loaded. The app will use Light Mode.');
        }
      } finally {
        if (isMounted) {
          setIsReady(true);
        }
      }
    }

    loadTheme();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    let isMounted = true;

    async function saveTheme() {
      try {
        const saveRequest = saveQueue.current
          .catch(() => undefined)
          .then(() => AsyncStorage.setItem(STORAGE_KEY, mode));
        saveQueue.current = saveRequest;
        await saveRequest;
        if (isMounted) {
          setStorageError('');
        }
      } catch (error) {
        if (isMounted) {
          setStorageError('Your theme changed, but could not be saved for the next launch.');
        }
      }
    }

    saveTheme();
    return () => {
      isMounted = false;
    };
  }, [isReady, mode]);

  const value = useMemo(() => ({
    mode,
    isDark: mode === 'dark',
    theme: mode === 'dark' ? darkTheme : lightTheme,
    storageError,
    isReady,
    setThemeMode,
  }), [isReady, mode, storageError, setThemeMode]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider.');
  }
  return context;
}
