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
const USER_NAME_STORAGE_KEY = '@mobile-computing-portfolio/user-name';
const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  // useState holds shared preferences until the screens change them.
  const [mode, setMode] = useState('light');
  const [userName, setUserName] = useState('');
  const [isReady, setIsReady] = useState(false);
  const [storageError, setStorageError] = useState('');
  const saveQueue = useRef(Promise.resolve());

  const setThemeMode = useCallback((nextMode) => {
    if (nextMode !== 'light' && nextMode !== 'dark') {
      throw new Error('Theme mode must be either "light" or "dark".');
    }

    setMode(nextMode);
  }, []);

  const updateUserName = useCallback((nextUserName) => {
    setUserName(nextUserName);
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function loadPreferences() {
      try {
        const results = await Promise.allSettled([
          AsyncStorage.getItem(STORAGE_KEY),
          AsyncStorage.getItem(USER_NAME_STORAGE_KEY),
        ]);

        if (!isMounted) {
          return;
        }

        const [savedModeResult, savedNameResult] = results;
        const loadErrors = [];

        if (savedModeResult.status === 'fulfilled') {
          if (savedModeResult.value === 'light' || savedModeResult.value === 'dark') {
            setMode(savedModeResult.value);
          }
        } else {
          loadErrors.push('Your saved theme could not be loaded.');
        }

        if (savedNameResult.status === 'fulfilled') {
          setUserName(savedNameResult.value || '');
        } else {
          loadErrors.push('Your saved display name could not be loaded.');
        }

        if (loadErrors.length > 0) {
          setStorageError(loadErrors.join(' '));
        }
      } finally {
        if (isMounted) {
          setIsReady(true);
        }
      }
    }

    loadPreferences();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    let isMounted = true;

    async function savePreferences() {
      try {
        const saveRequest = saveQueue.current
          .catch(() => undefined)
          .then(() => AsyncStorage.multiSet([
            [STORAGE_KEY, mode],
            [USER_NAME_STORAGE_KEY, userName],
          ]));
        saveQueue.current = saveRequest;
        await saveRequest;
        if (isMounted) {
          setStorageError('');
        }
      } catch (error) {
        if (isMounted) {
          setStorageError('Your preferences changed, but could not be saved for the next launch.');
        }
      }
    }

    savePreferences();
    return () => {
      isMounted = false;
    };
  }, [isReady, mode, userName]);

  // Context shares theme and profile preferences so every screen updates immediately.
  const value = useMemo(() => ({
    mode,
    isDark: mode === 'dark',
    theme: mode === 'dark' ? darkTheme : lightTheme,
    userName,
    storageError,
    isReady,
    setThemeMode,
    setUserName: updateUserName,
  }), [isReady, mode, storageError, setThemeMode, updateUserName, userName]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  // useContext lets each screen read and update the same provider value.
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider.');
  }
  return context;
}
