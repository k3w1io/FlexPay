import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { BrandMark, Icon } from '../../components/Icon';
import {
  Button,
  Card,
  Info,
  Page,
  Pill,
  TextButton,
  c,
  s,
} from '../../components/ui';
import { RouteCard } from '../../components/RouteCard';
import {
  activePlan,
  balance,
  DEMO_DATE,
  methodLabel,
  money,
} from '../../domain/demo';
import { useDemo } from '../../state/DemoProvider';

export default function TodayScreen() {
  const { state } = useDemo();
  const plan = activePlan(state);
  const eligible = state.profile.days.includes('Mon');
  return (
    <Page>
      <View style={s.between}>
        <View style={s.row}>
          <BrandMark size={33} />
          <Text
            style={{
              color: c.green,
              fontSize: 23,
              fontWeight: '800',
              letterSpacing: -1,
            }}
          >
            FlexPay
          </Text>
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Open your profile"
          onPress={() => router.push('/profile')}
          style={[s.bubble, { borderRadius: 22, backgroundColor: '#e8e1f1' }]}
        >
          <Text style={s.h3}>AM</Text>
        </Pressable>
      </View>
      <View style={{ gap: 6 }}>
        <Text style={s.body}>
          Good morning, Aoife <Text style={{ color: c.green }}>☀</Text>
        </Text>
        <Text style={s.title}>Make room for{'\n'}a better day.</Text>
      </View>
      <View
        style={{
          backgroundColor: c.green,
          borderRadius: 23,
          padding: 22,
          gap: 16,
          overflow: 'hidden',
        }}
      >
        <View style={s.between}>
          <Text style={[s.eyebrow, { color: '#b9d6a7' }]}>
            {plan ? 'YOUR FLEXIBLE DAY' : 'A LITTLE FLEXIBILITY PAYS'}
          </Text>
          <View
            style={{ backgroundColor: '#2d5040', borderRadius: 14, padding: 8 }}
          >
            <Icon name="leaf" color={c.lime} size={22} />
          </View>
        </View>
        <View style={s.between}>
          <View style={{ flex: 1, gap: 5 }}>
            <Text
              style={{
                fontSize: 37,
                letterSpacing: -1.5,
                fontWeight: '700',
                color: c.lime,
              }}
            >
              {plan?.status === 'paid' ? 'Nice work.' : 'Earn €3'}
            </Text>
            <Text style={{ color: '#d8e8ce', fontSize: 13, lineHeight: 20 }}>
              {plan?.status === 'paid'
                ? 'Your reward is in your demo wallet.'
                : 'One day. Both journeys. On your terms.'}
            </Text>
          </View>
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              backgroundColor: '#335c45',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon
              name={plan?.status === 'paid' ? 'check' : 'coffee'}
              color={c.lime}
              size={29}
            />
          </View>
        </View>
        <View style={{ height: 1, backgroundColor: '#40614d' }} />
        <View style={{ gap: 4 }}>
          <Text style={{ color: '#fffef1', fontWeight: '700', fontSize: 15 }}>
            {DEMO_DATE}
          </Text>
          <Text style={{ color: '#c0d2b8', fontSize: 12 }}>
            06:00–10:00 out · 16:00–19:00 home
          </Text>
        </View>
        <Pressable
          accessibilityRole="button"
          disabled={!plan && !eligible}
          accessibilityState={{ disabled: !plan && !eligible }}
          onPress={() =>
            router.push(
              plan
                ? { pathname: '/plan/[id]', params: { id: plan.id } }
                : '/offer',
            )
          }
          style={({ pressed }) => ({
            borderRadius: 13,
            backgroundColor: c.lime,
            minHeight: 48,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 14,
            opacity: !plan && !eligible ? 0.5 : pressed ? 0.8 : 1,
          })}
        >
          <Text style={{ fontSize: 14, fontWeight: '700', color: c.green }}>
            {plan
              ? 'View my plan'
              : eligible
                ? 'Find my flexible day'
                : 'Monday is not a commute day'}
          </Text>
          <Icon name="arrow" size={19} />
        </Pressable>
      </View>
      {!eligible && !plan && (
        <Info icon="calendar">
          Your preferences exclude Monday. Update your commute days to explore
          this demo offer.
        </Info>
      )}
      <Card>
        <RouteCard />
        <View style={s.divider} />
        <View style={s.between}>
          <Text style={s.small}>Make this commute more flexible.</Text>
          <TextButton onPress={() => router.push('/preferences')}>
            Edit
          </TextButton>
        </View>
      </Card>
      {plan && (
        <Card
          style={{
            backgroundColor: plan.status === 'review' ? c.amber : c.mint,
          }}
        >
          <View style={s.between}>
            <Text style={s.h3}>{methodLabel(plan.method)}</Text>
            <Pill amber={plan.status === 'review'}>
              {plan.status === 'paid'
                ? 'Reward added'
                : plan.status === 'review'
                  ? 'Needs review'
                  : 'Plan saved'}
            </Pill>
          </View>
          <Text style={s.body}>
            {plan.status === 'review'
              ? 'The simulated check needs another look. Your reward is pending.'
              : plan.status === 'paid'
                ? 'Thanks for making a little room on the road.'
                : 'You’re in control. You can change or cancel before completing your day.'}
          </Text>
        </Card>
      )}
      <View style={s.between}>
        <Text style={s.h2}>Small changes add up</Text>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Open wallet"
          onPress={() => router.push('/wallet')}
          style={{ alignItems: 'flex-end', paddingVertical: 8 }}
        >
          <Text style={s.h2}>{money(balance(state))}</Text>
          <Text style={s.small}>
            demo wallet <Text style={s.link}>↗</Text>
          </Text>
        </Pressable>
      </View>
      <View style={{ gap: 16 }}>
        {[
          {
            number: '01',
            title: 'Choose what works for you',
            text: 'Home, public transport, a lift or a later start.',
          },
          {
            number: '02',
            title: 'Keep your car out of the peak',
            text: 'Your day, your choice. No need to change every day.',
          },
          {
            number: '03',
            title: 'Complete the day, get rewarded',
            text: 'Track the check and reward in one place.',
          },
        ].map((step) => (
          <View key={step.number} style={[s.row, { alignItems: 'flex-start' }]}>
            <View
              style={[s.bubble, { width: 33, height: 33, borderRadius: 11 }]}
            >
              <Text
                style={{ fontSize: 11, fontWeight: '700', color: '#648153' }}
              >
                {step.number}
              </Text>
            </View>
            <View style={{ flex: 1, gap: 3 }}>
              <Text style={s.h3}>{step.title}</Text>
              <Text style={s.small}>{step.text}</Text>
            </View>
          </View>
        ))}
      </View>
      <Button secondary onPress={() => router.push('/help')} icon="help">
        How FlexPay works
      </Button>
    </Page>
  );
}
