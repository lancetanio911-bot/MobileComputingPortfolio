import { Pressable, StyleSheet, Text } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function CustomButton({
  label,
  onPress,
  variant = 'primary',
  accessibilityLabel,
  buttonStyle,
  labelStyle,
}) {
  const { theme } = useTheme();
  const isSecondary = variant === 'secondary';

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: isSecondary ? theme.colors.primarySoft : theme.colors.primary,
        },
        buttonStyle,
        { opacity: pressed ? 0.78 : 1 },
      ]}
    >
      <Text
        style={[
          styles.label,
          { color: isSecondary ? theme.colors.primary : '#FFFFFF' },
          labelStyle,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 48,
    borderRadius: 14,
    paddingHorizontal: 18,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
  label: {
    fontSize: 15,
    fontWeight: '700',
  },
});
