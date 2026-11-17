import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const modes = [
  { value: 'light', label: 'Light Mode' },
  { value: 'dark', label: 'Dark Mode' },
];

export default function ThemeToggle({ onModeChange }) {
  const { mode, setThemeMode, theme } = useTheme();

  function handleModeChange(nextMode) {
    setThemeMode(nextMode);
    onModeChange?.(nextMode);
  }

  return (
    <View
      accessibilityRole="radiogroup"
      accessibilityLabel="Appearance"
      style={styles.row}
    >
      {modes.map((option) => {
        const isSelected = mode === option.value;

        return (
          <Pressable
            key={option.value}
            accessibilityRole="radio"
            accessibilityLabel={option.label}
            accessibilityState={{ checked: isSelected }}
            onPress={() => handleModeChange(option.value)}
            style={({ pressed }) => [
              styles.option,
              {
                backgroundColor: isSelected ? theme.colors.primarySoft : theme.colors.background,
                borderColor: isSelected ? theme.colors.primary : theme.colors.border,
                opacity: pressed ? 0.78 : 1,
              },
            ]}
          >
            <Text
              style={[
                styles.label,
                { color: isSelected ? theme.colors.primary : theme.colors.muted },
              ]}
            >
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  option: {
    minHeight: 48,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 13,
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 13,
    textAlign: 'center',
    fontWeight: '700',
  },
});
