import { router } from 'expo-router';
import { Text, View } from 'react-native';
import { Icon } from '../../components/Icon';
import { Button, Card, Info, Page, c, s } from '../../components/ui';
import {
  balance,
  earned,
  money,
  OPENING_BALANCE_CENTS,
} from '../../domain/demo';
import { useDemo } from '../../state/DemoProvider';

export default function WalletScreen() {
  const { state } = useDemo();
  const cents = balance(state);
  const pending = state.plans.filter((p) => p.status === 'review').length * 300;
  return (
    <Page>
      <View style={{ gap: 7 }}>
        <Text style={s.eyebrow}>YOUR FLEXIBILITY, REWARDED</Text>
        <Text style={s.title}>A little extra.{'\n'}All yours.</Text>
        <Text style={s.body}>
          Every completed day earns a clear, fixed reward.
        </Text>
      </View>
      <View
        style={{
          backgroundColor: c.green,
          padding: 25,
          borderRadius: 23,
          gap: 15,
        }}
      >
        <View style={s.between}>
          <Text style={{ color: '#c5d5ba', fontSize: 13 }}>
            Available demo balance
          </Text>
          <Icon name="wallet" color={c.lime} />
        </View>
        <Text
          accessibilityLiveRegion="polite"
          style={{
            fontSize: 48,
            color: c.lime,
            fontWeight: '700',
            letterSpacing: -2,
          }}
        >
          {money(cents)}
        </Text>
        <View style={{ height: 1, backgroundColor: '#46644d' }} />
        <View style={s.between}>
          <Text style={{ color: '#dce8d3', fontSize: 12 }}>
            {money(OPENING_BALANCE_CENTS + earned(state))} lifetime sample
            rewards
          </Text>
          <Text style={{ color: '#dce8d3', fontSize: 12 }}>
            {state.plans.filter((p) => p.status === 'paid').length} new flex
            days
          </Text>
        </View>
      </View>
      <Button
        disabled={cents === 0}
        onPress={() => router.push('/transfer')}
        icon="bank"
      >
        {cents ? 'Try a demo transfer' : 'Your demo balance is transferred'}
      </Button>
      <Info>
        No real funds or bank connection. Your €12 starting balance and all
        transactions are fictional.
      </Info>
      {pending > 0 && (
        <Card style={{ backgroundColor: c.amber }}>
          <View style={s.between}>
            <Text style={s.h3}>Pending review</Text>
            <Text style={s.h2}>{money(pending)}</Text>
          </View>
          <Text style={s.small}>
            Held outside your available balance while the simulated check is
            reviewed.
          </Text>
          <Button secondary onPress={() => router.push('/plans')}>
            View pending day
          </Button>
        </Card>
      )}
      <Text style={s.h2}>Your activity</Text>
      <Card>
        {[...state.transfers].reverse().map((t) => (
          <Activity
            key={t.id}
            title="Demo transfer"
            text="Sample bank •••• 0421 · Simulated"
            amount={`−${money(t.cents)}`}
            icon="bank"
          />
        ))}
        {state.plans
          .filter((p) => p.status === 'paid')
          .map((p) => (
            <Activity
              key={p.id}
              title="Flexible day reward"
              text="Mon, 5 Oct · Both journeys completed"
              amount="+€3.00"
              icon="leaf"
            />
          ))}
        <Activity
          title="Earlier flexible days"
          text="4 sample daily rewards · Starting balance"
          amount="+€12.00"
          icon="wallet"
        />
      </Card>
      <Text style={[s.small, { textAlign: 'center' }]}>
        Rewards are €3 per completed day, including the return journey.
      </Text>
    </Page>
  );
}
function Activity({
  title,
  text,
  amount,
  icon,
}: {
  title: string;
  text: string;
  amount: string;
  icon: 'bank' | 'leaf' | 'wallet';
}) {
  return (
    <View style={[s.row, { paddingVertical: 7 }]}>
      <View style={s.bubble}>
        <Icon name={icon} size={21} />
      </View>
      <View style={{ flex: 1, gap: 4 }}>
        <Text style={s.h3}>{title}</Text>
        <Text style={s.small}>{text}</Text>
      </View>
      <Text style={{ fontSize: 15, fontWeight: '700', color: c.green }}>
        {amount}
      </Text>
    </View>
  );
}
