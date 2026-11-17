import { Pressable, StyleSheet, Text, View } from 'react-native';
import CustomButton from './CustomButton';
import { useTheme } from '../context/ThemeContext';

// Header shares screen titles and themed navigation controls across screens.
export default function Header({ title, navigation, showBack = false, showSettings = false }) {
  const { theme } = useTheme();

  function handleBack() {
    if (navigation.canGoBack()) {
      navigation.goBack();
      return;
    }

    navigation.navigate('Home');
  }

  return (
    <View style={styles.row}>
      {showBack ? (
        <CustomButton
          accessibilityLabel="Go back"
          label="‹"
          onPress={handleBack}
          buttonStyle={[
            styles.iconButton,
            { backgroundColor: theme.colors.surface, borderColor: theme.colors.border },
          ]}
          labelStyle={[styles.backIcon, { color: theme.colors.text }]}
        />
      ) : (
        <View style={styles.placeholder} />
      )}

      <Text numberOfLines={1} style={[styles.title, { color: theme.colors.text }]}>
        {title}
      </Text>

      {showSettings ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Open Settings"
          onPress={() => navigation.navigate('Settings')}
          style={({ pressed }) => [
            styles.settingsButton,
            { backgroundColor: theme.colors.primary, opacity: pressed ? 0.78 : 1 },
          ]}
        >
          <Text style={styles.settingsIcon}>⚙︎</Text>
        </Pressable>
      ) : (
        <View style={styles.placeholder} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  title: {
    flex: 1,
    marginHorizontal: 12,
    fontSize: 17,
    fontWeight: '700',
    textAlign: 'center',
  },
  placeholder: {
    width: 48,
    height: 48,
  },
  iconButton: {
    width: 48,
    height: 48,
    minHeight: 48,
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 0,
    alignSelf: 'auto',
  },
  settingsButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 34,
    lineHeight: 38,
    marginTop: -4,
  },
  settingsIcon: {
    color: '#FFFFFF',
    fontSize: 24,
    lineHeight: 28,
    textAlign: 'center',
  },
});
