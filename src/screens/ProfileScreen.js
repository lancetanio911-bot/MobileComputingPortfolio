import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useEffect, useState } from 'react';
import CustomButton from '../components/CustomButton';
import Header from '../components/Header';
import ScreenContainer from '../components/ScreenContainer';
import { useTheme } from '../context/ThemeContext';

function getTimeGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) {
    return 'Good morning';
  }
  if (hour < 18) {
    return 'Good afternoon';
  }
  return 'Good evening';
}

export default function ProfileScreen({ navigation }) {
  const { theme, userName, setUserName } = useTheme();
  // useState keeps an editable draft separate until Save is pressed.
  const [draftName, setDraftName] = useState(userName);
  const [timeGreeting, setTimeGreeting] = useState('');
  const [saveMessage, setSaveMessage] = useState('');

  // Set a greeting once when the Profile screen mounts.
  useEffect(() => {
    setTimeGreeting(getTimeGreeting());
  }, []);

  function saveName() {
    const savedName = draftName.trim();
    setDraftName(savedName);
    setUserName(savedName);
    setSaveMessage(savedName ? 'Display name saved.' : 'Display name cleared.');
  }

  return (
    <ScreenContainer>
      <Header title="Profile" navigation={navigation} showBack />

      <View
        style={[
          styles.profileCard,
          { backgroundColor: theme.colors.surface, borderColor: theme.colors.border },
        ]}
      >
        <View style={[styles.avatar, { backgroundColor: theme.colors.primarySoft }]}>
          <Text style={[styles.avatarText, { color: theme.colors.primary }]}>
            {userName.trim() ? userName.trim().charAt(0).toUpperCase() : '•'}
          </Text>
        </View>
        <Text style={[styles.greeting, { color: theme.colors.primary }]}>{timeGreeting}</Text>
        <Text style={[styles.name, { color: theme.colors.text }]}>
          {userName.trim() || 'No display name set'}
        </Text>
        <Text style={[styles.description, { color: theme.colors.muted }]}>
          Your profile name is shared across the portfolio.
        </Text>

        <View style={styles.editor}>
          <Text style={[styles.inputLabel, { color: theme.colors.text }]}>Display Name</Text>
          <TextInput
            accessibilityLabel="Edit display name"
            value={draftName}
            onChangeText={(value) => {
              setDraftName(value);
              setSaveMessage('');
            }}
            placeholder="Enter your name"
            placeholderTextColor={theme.colors.muted}
            autoCapitalize="words"
            autoCorrect={false}
            maxLength={40}
            returnKeyType="done"
            style={[
              styles.input,
              {
                color: theme.colors.text,
                backgroundColor: theme.colors.background,
                borderColor: theme.colors.border,
              },
            ]}
          />
          <CustomButton label="Save" onPress={saveName} buttonStyle={styles.saveButton} />
          {saveMessage ? (
            <Text accessibilityLiveRegion="polite" style={[styles.saveMessage, { color: theme.colors.primary }]}>
              {saveMessage}
            </Text>
          ) : null}
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  profileCard: {
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 22,
    paddingHorizontal: 24,
    paddingVertical: 30,
    marginTop: 12,
  },
  avatar: {
    width: 76,
    height: 76,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: '800',
  },
  greeting: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 6,
  },
  name: {
    maxWidth: '100%',
    fontSize: 22,
    lineHeight: 29,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    maxWidth: 420,
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
    marginBottom: 24,
  },
  editor: {
    width: '100%',
    maxWidth: 460,
    alignSelf: 'center',
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 8,
  },
  input: {
    minHeight: 48,
    borderWidth: 1,
    borderRadius: 13,
    paddingHorizontal: 14,
    fontSize: 14,
    marginBottom: 12,
  },
  saveButton: {
    alignSelf: 'stretch',
  },
  saveMessage: {
    fontSize: 12,
    marginTop: 10,
  },
});
