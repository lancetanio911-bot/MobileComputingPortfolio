import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';

// EmptyState presents consistent themed messaging when a section has no items.
export default function EmptyState({ title, description, icon = '✦' }) {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.surface, borderColor: theme.colors.border },
      ]}
    >
      <View style={[styles.iconBox, { backgroundColor: theme.colors.primarySoft }]}>
        <Text style={[styles.icon, { color: theme.colors.primary }]}>{icon}</Text>
      </View>
      <Text style={[styles.title, { color: theme.colors.text }]}>{title}</Text>
      <Text style={[styles.description, { color: theme.colors.muted }]}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 190,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 22,
    padding: 24,
  },
  iconBox: {
    width: 52,
    height: 52,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  icon: {
    fontSize: 24,
  },
  title: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '700',
    marginBottom: 8,
  },
  description: {
    maxWidth: 300,
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
  },
});
