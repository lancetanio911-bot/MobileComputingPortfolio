# Mobile Computing Portfolio

A React Native Expo foundation for a Mobile Computing master compilation. It currently contains only the Home Dashboard and Settings Screen; future laboratory activities should be added after the instructor provides their actual instructions.

## Run on Android with Expo Go

From the project directory:

```powershell
npx expo start
```

Install **Expo Go** from Google Play on the Android phone, connect the phone and computer to the same Wi-Fi network, then scan the QR code shown by Expo. Keep the terminal running while testing. If local Wi-Fi discovery is blocked, start Expo with:

```powershell
npx expo start --tunnel
```

## Project structure

```text
App.js
src/
  components/
    CustomButton.js
    Header.js
    ScreenContainer.js
    ThemeToggle.js
  constants/
    theme.js
  context/
    ThemeContext.js
  navigation/
    AppNavigator.js
  screens/
    HomeScreen.js
    SettingsScreen.js
```

## How it works

- `App.js` provides the global theme, waits until the saved preference has loaded, and gives React Navigation colors matching the selected theme.
- `src/navigation/AppNavigator.js` makes Home the root screen and registers only Home and Settings.
- `src/context/ThemeContext.js` uses `useState` for the shared theme, `useEffect` to load and save it with AsyncStorage, and `useContext` through `useTheme` so every screen reads and changes the same value.
- `src/constants/theme.js` defines the light and dark color palettes.
- `src/components/ScreenContainer.js` provides safe-area spacing and a `ScrollView` so content can scroll on smaller devices.
- `src/components/Header.js` displays the screen title, the accessible Settings gear on Home, or a guarded Back button on Settings.
- `src/components/CustomButton.js` is the reusable accessible button used by the header.
- `src/components/ThemeToggle.js` shows Light Mode and Dark Mode choices and updates the global theme.
- `src/screens/HomeScreen.js` shows the welcome message and the empty activities state. It contains no student profile or activity cards.
- `src/screens/SettingsScreen.js` contains Appearance and Application Information only.

## Test the foundation

1. Run `npx expo start` and open the project in Expo Go.
2. Confirm Home shows the My Portfolio header, Settings gear, welcome copy, and empty activities message only.
3. Tap the gear to open Settings.
4. Use the Back button or Android back gesture/button; both should return to Home without an unhandled navigation error.
5. Select Light Mode and Dark Mode and confirm the screen colors change immediately.
6. Close and reopen the app to confirm the saved theme is restored.
7. Scroll on a smaller screen and verify the content remains accessible.

The theme selections share global state while the empty Home screen intentionally has no activity interactions yet. Add laboratory screens only when their actual assignment requirements are available.
