import { router } from 'expo-router';
import { Text } from 'react-native';
import { Button, Page, s } from '../components/ui';
export default function NotFoundScreen() {
  return (
    <Page>
      <Text style={s.title}>Let’s get you{'\n'}back on track.</Text>
      <Text style={s.body}>That screen isn’t available in this demo.</Text>
      <Button onPress={() => router.replace('/')}>Back to FlexPay</Button>
    </Page>
  );
}
