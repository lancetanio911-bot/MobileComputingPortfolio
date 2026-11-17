import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import EmptyState from '../components/EmptyState';
import Header from '../components/Header';
import MenuCard from '../components/MenuCard';
import ScreenContainer from '../components/ScreenContainer';
import { useTheme } from '../context/ThemeContext';
import { activities } from '../data/activities';
import { quickAccessItems } from '../data/quickAccessItems';

export default function HomeScreen({ navigation }) {
  const { theme, userName } = useTheme();
  const { width } = useWindowDimensions();
  const cardWidth = width >= 680 ? '48.5%' : '100%';
  const greeting = userName.trim()
    ? `Welcome back, ${userName.trim()}`
    : 'Welcome back';

  function renderMenuCard(item) {
    return (
      <MenuCard
        key={item.route}
        icon={item.icon}
        title={item.title}
        description={item.description}
        accent={theme.colors[item.accent]}
        cardWidth={cardWidth}
        onPress={() => navigation.navigate(item.route)}
      />
    );
  }

  return (
    <ScreenContainer>
      <Header title="My Portfolio" navigation={navigation} showSettings />

      <View style={styles.welcome}>
        <Text style={[styles.greeting, { color: theme.colors.primary }]}>{greeting}</Text>
        <Text style={[styles.heading, { color: theme.colors.text }]}>
          Mobile Computing Portfolio
        </Text>
        <Text style={[styles.description, { color: theme.colors.muted }]}>
          Your home for current and future laboratory activities.
        </Text>
      </View>

      <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Access</Text>
      <View style={styles.cardGrid}>{quickAccessItems.map(renderMenuCard)}</View>

      <Text style={[styles.sectionTitle, styles.activitiesTitle, { color: theme.colors.text }]}>
        Your Activities
      </Text>
      {activities.length > 0 ? (
        <View style={styles.cardGrid}>{activities.map(renderMenuCard)}</View>
      ) : (
        <EmptyState
          title="No activities added yet."
          description="Your laboratory activities will appear here once added."
        />
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  welcome: {
    marginTop: 24,
    marginBottom: 34,
  },
  greeting: {
    fontSize: 14,
    letterSpacing: 0.3,
    fontWeight: '700',
    marginBottom: 12,
  },
  heading: {
    maxWidth: 620,
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
  activitiesTitle: {
    marginTop: 32,
  },
  cardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
  },
});
