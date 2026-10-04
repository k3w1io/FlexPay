import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Icon } from '../components/Icon';
import { RouteCard } from '../components/RouteCard';
import {
  BackHeader,
  Button,
  Card,
  Choice,
  Info,
  Page,
  Pill,
  TextButton,
  c,
  s,
} from '../components/ui';
import {
  activePlan,
  DEMO_DATE,
  METHODS,
  methodLabel,
  type Method,
} from '../domain/demo';
import { useDemo } from '../state/DemoProvider';

export default function OfferScreen() {
  const { edit } = useLocalSearchParams<{ edit?: string }>();
  const { state, dispatch } = useDemo();
  const current = activePlan(state);
  const editing = edit === '1' && current?.status === 'planned';
  const [method, setMethod] = useState<Method>(
    editing ? current.method : 'home',
  );
  const [step, setStep] = useState(0);
  const [agreed, setAgreed] = useState(false);
  const eligible = state.profile.days.includes('Mon');
  const unavailable = !editing && !!current;
  const confirm = () => {
    if (!agreed || unavailable || (!eligible && !editing)) return;
    if (editing) dispatch({ type: 'change', id: current.id, method });
    else dispatch({ type: 'book', method });
    router.replace({
      pathname: '/plan/[id]',
      params: { id: editing ? current.id : `plan-${state.plans.length + 1}` },
    });
  };
  return (
    <Page
      key={step}
      footer={
        <View style={{ gap: 9 }}>
          <Button
            onPress={step === 0 ? () => setStep(1) : confirm}
            disabled={
              unavailable || (!eligible && !editing) || (step === 1 && !agreed)
            }
            icon={step === 0 ? 'arrow' : 'check'}
          >
            {step === 0
              ? 'Review my day'
              : editing
                ? 'Save my changes'
                : 'Save my flexible day'}
          </Button>
          <Text style={[s.small, { textAlign: 'center' }]}>
            {step === 0
              ? 'Choose freely. There’s no commitment yet.'
              : '€3 total for the day · Cancel anytime before completion'}
          </Text>
        </View>
      }
    >
      <BackHeader title={editing ? 'Change my plan' : 'Your flexible day'} />
      <View style={s.between}>
        <Pill>{step === 0 ? '1 of 2 · Choose' : '2 of 2 · Review'}</Pill>
        <Text style={s.small}>Mon, 5 Oct · Demo date</Text>
      </View>
      <View style={{ gap: 8 }}>
        <Text style={s.title}>
          {step === 0 ? 'What works\nfor you?' : 'A day that\nfits your life.'}
        </Text>
        <Text style={s.body}>
          {step === 0
            ? 'Leave your own car out of the selected peak windows. Choose an alternative you can use for both journeys.'
            : 'Here’s your plan. Make sure both journeys work before you save it.'}
        </Text>
      </View>
      {unavailable && (
        <Info amber icon="calendar">
          You already have a plan for this day. Open it from My plans to view or
          change it.
        </Info>
      )}
      {!eligible && !editing && (
        <Info amber icon="calendar">
          Monday is outside your commute preferences. Update your preferences to
          unlock this offer.
        </Info>
      )}
      {step === 0 ? (
        <View style={{ gap: 11 }}>
          {METHODS.map((m) => (
            <Choice
              key={m.id}
              title={m.title}
              subtitle={m.subtitle}
              icon={m.icon}
              selected={method === m.id}
              onPress={() => setMethod(m.id)}
            />
          ))}
        </View>
      ) : (
        <>
          <Card style={{ backgroundColor: c.mint }}>
            <View style={s.between}>
              <Text style={s.h3}>{methodLabel(method)}</Text>
              <Icon name={METHODS.find((m) => m.id === method)!.icon} />
            </View>
            <Text style={s.body}>{DEMO_DATE}</Text>
            <TextButton
              onPress={() => {
                setStep(0);
                setAgreed(false);
              }}
            >
              Change my choice
            </TextButton>
          </Card>
          <Card>
            <RouteCard />
          </Card>
        </>
      )}
      <Card>
        <View style={s.between}>
          <Text style={s.h3}>Your daily reward</Text>
          <Text style={[s.h2, { fontSize: 29 }]}>€3.00</Text>
        </View>
        <View style={s.divider} />
        <View style={s.row}>
          <Icon name="clock" size={19} />
          <View style={s.grow}>
            <Text style={s.h3}>06:00–10:00 · Outward</Text>
            <Text style={s.small}>N7 eastbound, Newlands Cross → Red Cow</Text>
          </View>
        </View>
        <View style={s.row}>
          <Icon name="clock" size={19} />
          <View style={s.grow}>
            <Text style={s.h3}>16:00–19:00 · Return</Text>
            <Text style={s.small}>
              Corresponding return journey · Demo window
            </Text>
          </View>
        </View>
        <Text style={s.small}>
          Keep your own car out of both windows. The €3 reward covers the whole
          day, including your return.
        </Text>
      </Card>
      {method === 'later' && (
        <Info icon="clock">
          For this plan, set off after 10:00 and return after 19:00. Only choose
          this if those times work for you.
        </Info>
      )}
      {method === 'passenger' && (
        <Info icon="people">
          The reward is for leaving your own car at home. Being the driver of a
          shared car does not qualify for this demo offer.
        </Info>
      )}
      {step === 1 && (
        <Pressable
          accessibilityRole="checkbox"
          aria-checked={agreed}
          accessibilityState={{ checked: agreed }}
          accessibilityLabel="I normally drive this route and can keep my own car out of both peak windows"
          onPress={() => setAgreed(!agreed)}
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            gap: 12,
            paddingVertical: 8,
          }}
        >
          <View
            style={{
              width: 24,
              height: 24,
              borderRadius: 6,
              borderWidth: 1.5,
              borderColor: c.green,
              backgroundColor: agreed ? c.green : c.white,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {agreed && <Icon name="check" size={17} color={c.lime} />}
          </View>
          <Text style={[s.body, { flex: 1, color: c.ink }]}>
            I normally drive this route and can keep my own car out of both peak
            windows for this day.
          </Text>
        </Pressable>
      )}
      <Info>
        Demo offer and windows. You’ll confirm your day, then a simulated check
        will show a reward or review. Nothing is tracked or paid in real life.
      </Info>
    </Page>
  );
}
