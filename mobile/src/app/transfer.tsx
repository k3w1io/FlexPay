import { router } from 'expo-router';
import { useState } from 'react';
import { Text, View } from 'react-native';
import { Icon } from '../components/Icon';
import { BackHeader, Button, Card, Info, Page, c, s } from '../components/ui';
import { balance, money } from '../domain/demo';
import { useDemo } from '../state/DemoProvider';

export default function TransferScreen() {
  const { state, dispatch } = useDemo();
  const [receipt, setReceipt] = useState<number | null>(null);
  const cents = balance(state);
  return (
    <Page>
      <BackHeader title="Demo transfer" />
      <View style={{ gap: 9 }}>
        <Text style={s.title}>
          {receipt !== null
            ? 'Transfer shown.\nDemo complete.'
            : 'Your reward,\nyour choice.'}
        </Text>
        <Text style={s.body}>
          {receipt !== null
            ? 'Your demo wallet has been updated. No funds moved and no bank was contacted.'
            : 'Preview what transferring your rewards could look like. This action only changes the demo wallet.'}
        </Text>
      </View>
      <Card
        style={{
          backgroundColor: c.mint,
          alignItems: 'center',
          paddingVertical: 30,
        }}
      >
        <View
          style={[
            s.bubble,
            {
              backgroundColor: c.lime,
              height: 64,
              width: 64,
              borderRadius: 32,
            },
          ]}
        >
          <Icon name={receipt !== null ? 'check' : 'bank'} size={31} />
        </View>
        <Text style={s.small}>
          {receipt !== null
            ? 'Simulated transfer amount'
            : 'Available to transfer in the demo'}
        </Text>
        <Text
          style={{
            fontSize: 43,
            fontWeight: '700',
            letterSpacing: -1.5,
            color: c.green,
          }}
        >
          {money(receipt ?? cents)}
        </Text>
      </Card>
      <Card>
        <Text style={s.h3}>Sample destination</Text>
        <View style={s.row}>
          <Icon name="bank" />
          <View style={{ gap: 4 }}>
            <Text style={s.h3}>Aoife’s demo bank</Text>
            <Text style={s.small}>Fictional account ending 0421</Text>
          </View>
        </View>
      </Card>
      <Info>
        There is no real payment provider in this demo. Don’t enter any banking
        details.
      </Info>
      {receipt !== null ? (
        <Button onPress={() => router.replace('/wallet')} icon="arrow">
          Back to my wallet
        </Button>
      ) : (
        <Button
          disabled={cents === 0}
          onPress={() => {
            if (cents > 0) {
              setReceipt(cents);
              dispatch({ type: 'transfer' });
            }
          }}
          icon="check"
        >
          Confirm simulated transfer
        </Button>
      )}
    </Page>
  );
}
