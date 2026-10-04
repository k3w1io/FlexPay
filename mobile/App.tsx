import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>BUILD FOR IRELAND</Text>
      <Text style={styles.title}>FlexPay</Text>
      <Text style={styles.description}>
        Buy flexibility. Create road capacity.
      </Text>
      <Text style={styles.note}>Hackathon starter — demo flow comes next.</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7f4',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 28,
  },
  label: {
    color: '#446653',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: 18,
  },
  title: {
    color: '#153d2a',
    fontSize: 48,
    fontWeight: '800',
  },
  description: {
    color: '#304a3b',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 12,
  },
  note: {
    color: '#66756c',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 28,
  },
});
