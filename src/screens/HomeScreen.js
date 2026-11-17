import { StyleSheet, Text, View } from 'react-native';
import Header from '../components/Header';
import ScreenContainer from '../components/ScreenContainer';
import { useTheme } from '../context/ThemeContext';

export default function HomeScreen({ navigation }) {
  const { theme } = useTheme();

  return (
    <ScreenContainer>
      <Header title="My Portfolio" navigation={navigation} showSettings />

      <View style={styles.welcome}>
        <Text style={[styles.greeting, { color: theme.colors.primary }]}>WELCOME BACK</Text>
        <Text style={[styles.heading, { color: theme.colors.text }]}>Mobile Computing Portfolio</Text>
        <Text style={[styles.description, { color: theme.colors.muted }]}>
          Your home for current and future laboratory activities.
        </Text>
      </View>

      <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Your Activities</Text>
      <View
        style={[
          styles.emptyState,
          { backgroundColor: theme.colors.surface, borderColor: theme.colors.border },
        ]}
      >
        <View style={[styles.emptyMark, { backgroundColor: theme.colors.sage }]}>
          <View style={[styles.emptyMarkInner, { backgroundColor: theme.colors.blue }]} />
        </View>
        <Text style={[styles.emptyTitle, { color: theme.colors.text }]}>
          No activities added yet.
        </Text>
        <Text style={[styles.emptyDescription, { color: theme.colors.muted }]}>
          Your laboratory activities will appear here once added.
        </Text>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  welcome: {
    marginTop: 24,
    marginBottom: 38,
  },
  greeting: {
    fontSize: 12,
    letterSpacing: 1.5,
    fontWeight: '800',
    marginBottom: 12,
  },
  heading: {
    maxWidth: 360,
    fontSize: 32,
    lineHeight: 39,
    letterSpacing: -0.5,
    fontWeight: '800',
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    lineHeight: 23,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: '800',
    marginBottom: 14,
  },
  emptyState: {
    minHeight: 222,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 22,
    paddingHorizontal: 24,
    paddingVertical: 28,
  },
  emptyMark: {
    width: 58,
    height: 58,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  emptyMarkInner: {
    width: 26,
    height: 26,
    borderRadius: 9,
  },
  emptyTitle: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '700',
    marginBottom: 8,
  },
  emptyDescription: {
    maxWidth: 280,
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
  },
});
