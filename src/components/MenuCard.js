import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function MenuCard({ icon, title, description, onPress, accent, cardWidth }) {
  const { theme } = useTheme();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${title}. ${description}`}
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        {
          width: cardWidth,
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
          opacity: pressed ? 0.82 : 1,
        },
      ]}
    >
      <View style={[styles.iconBox, { backgroundColor: accent }]}>
        <Text style={styles.icon}>{icon}</Text>
      </View>
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.colors.text }]}>{title}</Text>
        <Text style={[styles.description, { color: theme.colors.muted }]}>{description}</Text>
      </View>
      <Text accessibilityElementsHidden style={[styles.indicator, { color: theme.colors.primary }]}>
        ›
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 116,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 20,
    padding: 18,
  },
  iconBox: {
    width: 50,
    height: 50,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 24,
  },
  content: {
    flex: 1,
    minWidth: 0,
    marginHorizontal: 14,
  },
  title: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: '700',
    marginBottom: 5,
  },
  description: {
    fontSize: 12,
    lineHeight: 18,
  },
  indicator: {
    fontSize: 28,
    lineHeight: 32,
  },
});
