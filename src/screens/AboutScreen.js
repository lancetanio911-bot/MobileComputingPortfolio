import { StyleSheet, Text, View } from 'react-native';
import Header from '../components/Header';
import ScreenContainer from '../components/ScreenContainer';
import { useTheme } from '../context/ThemeContext';
import appConfig from '../../app.json';

export default function AboutScreen({ navigation }) {
  const { theme } = useTheme();

  return (
    <ScreenContainer>
      <Header title="About" navigation={navigation} showBack />

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
          A master compilation app for organizing current and future Mobile Computing laboratory
          activities.
        </Text>
        <View style={[styles.separator, { backgroundColor: theme.colors.border }]} />
        <View style={styles.detailRow}>
          <Text style={[styles.detailLabel, { color: theme.colors.muted }]}>Version</Text>
          <Text style={[styles.detailValue, { color: theme.colors.text }]}>
            {appConfig.expo.version}
          </Text>
        </View>
        <View style={[styles.separator, { backgroundColor: theme.colors.border }]} />
        <Text style={[styles.developedLabel, { color: theme.colors.text }]}>Developed by</Text>
        <Text style={[styles.developedNames, { color: theme.colors.muted }]}>
          Partner 1, Partner 2
        </Text>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  panel: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 22,
    marginTop: 12,
  },
  appName: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '800',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
  },
  separator: {
    height: 1,
    marginVertical: 18,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  detailLabel: {
    fontSize: 13,
  },
  detailValue: {
    fontSize: 13,
    fontWeight: '700',
  },
  developedLabel: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 7,
  },
  developedNames: {
    fontSize: 14,
    lineHeight: 21,
  },
});
