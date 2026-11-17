import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import Header from '../components/Header';
import ScreenContainer from '../components/ScreenContainer';
import ThemeToggle from '../components/ThemeToggle';
import { useTheme } from '../context/ThemeContext';
import appConfig from '../../app.json';

export default function SettingsScreen({ navigation }) {
  const { theme, storageError } = useTheme();
  const [themeMessage, setThemeMessage] = useState('');
  const appVersion = appConfig.expo.version;

  return (
    <ScreenContainer>
      <Header title="Settings" navigation={navigation} showBack />

      <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Appearance</Text>
      <View
        style={[
          styles.panel,
          { backgroundColor: theme.colors.surface, borderColor: theme.colors.border },
        ]}
      >
        <Text style={[styles.panelDescription, { color: theme.colors.muted }]}>
          Choose how the app looks on your device.
        </Text>
        <ThemeToggle
          onModeChange={(mode) => {
            setThemeMessage(`${mode === 'dark' ? 'Dark' : 'Light'} Mode selected.`);
          }}
        />
        {themeMessage ? (
          <Text
            accessibilityLiveRegion="polite"
            style={[styles.themeMessage, { color: theme.colors.primary }]}
          >
            {themeMessage}
          </Text>
        ) : null}
      </View>

      {storageError ? (
        <Text accessibilityRole="alert" style={[styles.error, { color: theme.colors.warning }]}>
          {storageError}
        </Text>
      ) : null}

      <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
        Application Information
      </Text>
      <View
        style={[
          styles.panel,
          { backgroundColor: theme.colors.surface, borderColor: theme.colors.border },
        ]}
      >
        <Text style={[styles.appName, { color: theme.colors.text }]}>
          Mobile Computing Portfolio
        </Text>
        <Text style={[styles.description, { color: theme.colors.muted }]}>
          A master compilation foundation for current and future Mobile Computing laboratory
          activities.
        </Text>
        <View style={[styles.separator, { backgroundColor: theme.colors.border }]} />
        <View style={styles.versionRow}>
          <Text style={[styles.versionLabel, { color: theme.colors.muted }]}>Version</Text>
          <Text style={[styles.versionValue, { color: theme.colors.text }]}>{appVersion}</Text>
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    marginTop: 16,
    marginBottom: 12,
  },
  panel: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 18,
    marginBottom: 12,
  },
  panelDescription: {
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 12,
  },
  themeMessage: {
    fontSize: 12,
    lineHeight: 18,
    marginTop: 10,
  },
  appName: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  description: {
    fontSize: 13,
    lineHeight: 20,
  },
  separator: {
    height: 1,
    marginVertical: 16,
  },
  versionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  versionLabel: {
    fontSize: 13,
  },
  versionValue: {
    fontSize: 13,
    fontWeight: '700',
  },
  error: {
    fontSize: 13,
    lineHeight: 19,
    marginTop: 8,
  },
});
