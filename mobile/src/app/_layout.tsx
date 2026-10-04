import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { BrandMark, Icon } from '../components/Icon';
import { JourneyArt } from '../components/JourneyArt';
import { c, s } from '../components/ui';
import { DemoProvider, useDemo } from '../state/DemoProvider';

function AppFrame() {
  const { state, ready, storageError } = useDemo();
  const { width } = useWindowDimensions();
  const desktop = Platform.OS === 'web' && width >= 940;
  return (
    <View
      style={[
        styles.root,
        desktop && { flexDirection: 'row', gap: 85, paddingHorizontal: 50 },
      ]}
    >
      <StatusBar style="dark" />
      {desktop && (
        <View style={styles.story}>
          <View style={s.row}>
            <BrandMark />
            <Text style={styles.wordmark}>FlexPay</Text>
            <Text style={styles.previewLabel}>BUILD FOR IRELAND</Text>
          </View>
          <View style={{ marginTop: 32, marginBottom: 22, gap: 15 }}>
            <Text style={s.eyebrow}>A BETTER WAY TO GET THERE</Text>
            <Text style={styles.storyTitle}>
              A little flexibility.{'\n'}A better everyday.
            </Text>
            <Text style={styles.storyBody}>
              Make room on the road. Get rewarded for a commute that works for
              you.
            </Text>
          </View>
          <JourneyArt large />
          <View style={{ gap: 15, marginTop: 28 }}>
            {[
              {
                icon: 'calendar' as const,
                label: 'Choose a day that fits your life',
              },
              {
                icon: 'leaf' as const,
                label: 'Leave your car out of the peak',
              },
              {
                icon: 'wallet' as const,
                label: 'See your reward, every step of the way',
              },
            ].map((x) => (
              <View style={s.row} key={x.label}>
                <Icon name={x.icon} size={20} />
                <Text style={s.body}>{x.label}</Text>
              </View>
            ))}
          </View>
          <Text style={[s.small, { marginTop: 32 }]}>
            Interactive customer demo · Synthetic account & rewards
          </Text>
        </View>
      )}
      <SafeAreaView
        edges={['top', 'left', 'right', 'bottom']}
        style={desktop ? styles.desktopPhone : styles.phone}
      >
        <View style={styles.demoBar}>
          <View
            style={{
              width: 6,
              height: 6,
              borderRadius: 3,
              backgroundColor: '#64974c',
            }}
          />
          <Text style={styles.demoText}>DEMO EXPERIENCE</Text>
          <Text style={styles.demoSub}>No real payments</Text>
        </View>
        {storageError && (
          <Text
            accessibilityRole="alert"
            style={[s.small, { padding: 10, backgroundColor: c.amber }]}
          >
            Your progress cannot be saved on this device. The demo still works
            until you close it.
          </Text>
        )}
        {!ready ? (
          <View style={[s.grow, s.center]}>
            <ActivityIndicator
              color={c.green}
              accessibilityLabel="Loading your demo"
            />
          </View>
        ) : (
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: c.bg },
              animation: 'slide_from_right',
            }}
          >
            <Stack.Protected guard={!state.signedIn}>
              <Stack.Screen name="login" />
            </Stack.Protected>
            <Stack.Protected guard={state.signedIn}>
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="offer" />
              <Stack.Screen name="plan/[id]" />
              <Stack.Screen name="preferences" />
              <Stack.Screen name="help" />
              <Stack.Screen name="transfer" />
            </Stack.Protected>
            <Stack.Screen name="+not-found" />
          </Stack>
        )}
      </SafeAreaView>
    </View>
  );
}
export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <DemoProvider>
        <AppFrame />
      </DemoProvider>
    </SafeAreaProvider>
  );
}
const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e9eee4',
  },
  story: { width: 405 },
  wordmark: {
    fontSize: 25,
    color: c.green,
    fontWeight: '800',
    letterSpacing: -1.2,
  },
  previewLabel: {
    marginLeft: 'auto',
    color: c.muted,
    letterSpacing: 1,
    fontSize: 8,
    fontWeight: '700',
  },
  storyTitle: {
    color: c.ink,
    fontSize: 43,
    lineHeight: 48,
    fontWeight: '700',
    letterSpacing: -2.2,
  },
  storyBody: { color: c.muted, fontSize: 17, lineHeight: 27, maxWidth: 355 },
  phone: { flex: 1, width: '100%', backgroundColor: c.bg },
  desktopPhone: {
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: 420,
    minWidth: 420,
    width: 420,
    height: '94%',
    maxHeight: 900,
    backgroundColor: c.bg,
    borderRadius: 28,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#d1dacb',
    boxShadow: '0px 18px 60px rgba(24,62,49,0.12)',
  },
  demoBar: {
    backgroundColor: '#eaf0e0',
    minHeight: 29,
    paddingHorizontal: 20,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  demoText: {
    fontSize: 8,
    letterSpacing: 1.2,
    fontWeight: '800',
    color: '#4d6444',
  },
  demoSub: { fontSize: 9, color: '#576c50', marginLeft: 'auto' },
});
