# Mobile Computing Portfolio

A React Native Expo master-compilation app for a Mobile Computing course. Quick Access provides Profile and About screens. The activities section remains empty until the instructor assigns actual laboratory activities.

## Run the app

From the project directory:

```powershell
npm install
npx expo start
```

Scan the Expo QR code with Expo Go on Android. To run in a web browser, press `w` in the Expo terminal or run `npx expo start --web`.

## Folder structure

```text
App.js
src/
  components/
    CustomButton.js
    EmptyState.js
    Header.js
    MenuCard.js
    ScreenContainer.js
    ThemeToggle.js
  constants/
    theme.js
  context/
    ThemeContext.js
  data/
    activities.js
    quickAccessItems.js
  navigation/
    AppNavigator.js
  screens/
    AboutScreen.js
    HomeScreen.js
    ProfileScreen.js
    SettingsScreen.js
```

## Features and instructor rubric

- **Multi-screen navigation:** Home is the responsive dashboard. Quick Access cards open Profile and About; Home also links to Settings.
- **Reusable components and hooks:** `MenuCard` is shared by quick links and future activities, and `CustomButton` is reused for profile saving. The Profile screen uses `useState` for its editable draft and `useEffect` to set a time-based greeting.
- **Responsive Flexbox layout:** Screens use `View`, `ScrollView`, and Flexbox. `useWindowDimensions` controls one-column cards on narrow screens and two columns on wider screens. `ScreenContainer` centers content with a maximum width.
- **Global state:** `ThemeContext` shares the current theme and display name. Settings updates the display name globally, and theme changes update all screens immediately. AsyncStorage persists both preferences.
- **No invented labs:** `src/data/activities.js` starts as an empty array, so Home keeps showing “No activities added yet” and the supporting text.

## How to add a new activity

Only add an activity after its actual assignment is provided:

1. Implement its screen in `src/screens/`.
2. Register a matching route in `src/navigation/AppNavigator.js`.
3. Add an entry to the `activities` array in `src/data/activities.js`, using the route name, title, description, icon, and one existing theme accent key (such as `sage`, `blue`, `rose`, or `primarySoft`).

Home renders configured activities with the reusable `MenuCard`. Leave the array empty until an activity is assigned.

## Screen-recording demo

1. Start on Home and show Quick Access, the empty Activities message, and the Settings icon.
2. Open Profile, edit the name, and press Save. Go back to show the Home greeting update.
3. Reopen Profile and show the time-based greeting and saved name.
4. Open Settings, edit Display Name, and toggle Light/Dark Mode. Show the updates immediately on Home and Profile.
5. Open About and show the app description, version, and partner placeholders.
6. Resize the web browser from a narrow phone layout to a wider desktop layout to show responsive cards and centered content.

## Pair members

- Partner 1: ______________________________
- Partner 2: ______________________________
