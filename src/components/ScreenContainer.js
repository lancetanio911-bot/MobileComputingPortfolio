import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';

// ScreenContainer applies themed safe-area, scroll, and centered-width layout.
export default function ScreenContainer({ children, contentContainerStyle }) {
  const { theme } = useTheme();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.background }]}>
      <ScrollView
        contentContainerStyle={[styles.content, contentContainerStyle]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.inner}>{children}</View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 32,
  },
  inner: {
    width: '100%',
    maxWidth: 960,
    alignSelf: 'center',
  },
});
