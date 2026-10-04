import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { ConfirmDialog } from '../../components/ConfirmDialog';
import { Icon } from '../../components/Icon';
import { RouteCard } from '../../components/RouteCard';
import {
  BackHeader,
  Button,
  Card,
  Info,
  Page,
  Pill,
  TextButton,
  c,
  s,
} from '../../components/ui';
import { METHODS, methodLabel } from '../../domain/demo';
import { useDemo } from '../../state/DemoProvider';

export default function PlanScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { state, dispatch } = useDemo();
  const plan = state.plans.find((p) => p.id === id);
  const [confirmed, setConfirmed] = useState(false);
  const [busy, setBusy] = useState(false);
  const [cancelling, setCancelling] = useState(false);
  useEffect(() => {
    if (!busy) return;
    const timer = setTimeout(() => {
      dispatch({ type: 'complete', id });
      setBusy(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, [busy, dispatch, id]);
  if (!plan)
    return (
      <Page>
        <BackHeader title="My plan" />
        <Text style={s.title}>Let’s find your plan.</Text>
        <Text style={s.body}>
          This plan is no longer available. Head back to explore your flexible
          day.
        </Text>
        <Button onPress={() => router.replace('/plans')}>Open my plans</Button>
      </Page>
    );
  const paid = plan.status === 'paid';
  const review = plan.status === 'review';
  const cancelled = plan.status === 'cancelled';
  const title = paid
    ? 'A little flexibility.\nWell rewarded.'
    : review
      ? 'We need another\nlook at your day.'
      : cancelled
        ? 'Plans change.\nThat’s okay.'
        : 'You’re all set,\nAoife.';
  return (
    <Page>
      <BackHeader title="My flexible day" />
      <View style={{ alignItems: 'center', paddingVertical: 9, gap: 16 }}>
        <View
          style={{
            backgroundColor: review ? c.amber : cancelled ? c.lilac : c.lime,
            width: 76,
            height: 76,
            borderRadius: 38,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon
            name={
              paid
                ? 'wallet'
                : review
                  ? 'help'
                  : cancelled
                    ? 'calendar'
                    : 'check'
            }
            size={34}
          />
        </View>
        <Text
          accessibilityLiveRegion="polite"
          style={[s.title, { textAlign: 'center' }]}
        >
          {title}
        </Text>
        <Text style={[s.body, { textAlign: 'center' }]}>
          {paid
            ? '€3.00 added to your demo wallet. Thank you for making room on the road.'
            : review
              ? 'The simulated check was inconclusive. Your reward is pending, and you can ask for a review.'
              : cancelled
                ? 'Your day is cancelled. No reward was added, and there’s no penalty.'
                : 'Your plan is saved. You can change it if life gets in the way.'}
        </Text>
      </View>
      <Card>
        <View style={s.between}>
          <Text style={s.h3}>Monday, 5 October</Text>
          <Pill amber={review}>
            {paid
              ? 'Reward added'
              : review
                ? 'Pending review'
                : cancelled
                  ? 'Cancelled'
                  : 'Plan saved'}
          </Pill>
        </View>
        <View style={s.row}>
          <View style={s.bubble}>
            <Icon name={METHODS.find((m) => m.id === plan.method)!.icon} />
          </View>
          <View style={s.grow}>
            <Text style={s.h3}>{methodLabel(plan.method)}</Text>
            <Text style={s.small}>06:00–10:00 out · 16:00–19:00 home</Text>
          </View>
        </View>
        <View style={s.divider} />
        <RouteCard />
        <View style={s.divider} />
        <View style={s.between}>
          <Text style={s.body}>Reward for both journeys</Text>
          <Text style={s.h2}>€3.00</Text>
        </View>
      </Card>
      {!cancelled && (
        <Card>
          <Text style={s.h3}>Your day, step by step</Text>
          {[
            {
              title: 'Plan saved',
              text: 'Your alternative is chosen.',
              done: true,
            },
            {
              title: 'Day completed',
              text:
                plan.status === 'planned'
                  ? 'Confirm both journeys below.'
                  : 'Your day has been confirmed in the demo.',
              done: plan.status !== 'planned',
            },
            {
              title: review ? 'Review in progress' : 'Reward added',
              text: paid
                ? '€3.00 is ready in your demo wallet.'
                : review
                  ? 'Your reward is held while the check is reviewed.'
                  : 'Added after the simulated check.',
              done: paid,
            },
          ].map((step, i) => (
            <View
              style={[s.row, { alignItems: 'flex-start' }]}
              key={step.title}
            >
              <View
                style={{
                  height: 27,
                  width: 27,
                  backgroundColor: step.done ? c.green : c.mint,
                  borderRadius: 14,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {step.done ? (
                  <Icon name="check" size={15} color={c.lime} />
                ) : (
                  <Text style={s.small}>{i + 1}</Text>
                )}
              </View>
              <View style={{ flex: 1, gap: 2 }}>
                <Text style={s.h3}>{step.title}</Text>
                <Text style={s.small}>{step.text}</Text>
              </View>
            </View>
          ))}
        </Card>
      )}
      {plan.status === 'planned' && (
        <>
          <Info icon="clock">
            Presenter shortcut: complete the whole day below. The demo skips the
            wait until after the return window.
          </Info>
          <Pressable
            disabled={busy}
            accessibilityRole="checkbox"
            aria-checked={confirmed}
            accessibilityState={{ checked: confirmed, disabled: busy }}
            accessibilityLabel="I kept my own car out of both peak windows"
            onPress={() => setConfirmed(!confirmed)}
            style={[
              s.row,
              { minHeight: 48, alignItems: 'flex-start', paddingVertical: 7 },
            ]}
          >
            <View
              style={{
                width: 24,
                height: 24,
                borderRadius: 6,
                borderWidth: 1.5,
                borderColor: c.green,
                backgroundColor: confirmed ? c.green : c.white,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {confirmed && <Icon name="check" size={17} color={c.lime} />}
            </View>
            <Text style={[s.body, { flex: 1, color: c.ink }]}>
              I kept my own car out of both peak windows.
            </Text>
          </Pressable>
          {busy && (
            <View style={s.row}>
              <ActivityIndicator color={c.green} />
              <Text accessibilityRole="alert" style={s.body}>
                Running the simulated check…
              </Text>
            </View>
          )}
          <Button
            disabled={!confirmed || busy}
            onPress={() => setBusy(true)}
            icon="check"
          >
            {busy ? 'Checking your demo day…' : 'Demo: complete my day'}
          </Button>
          <Button
            secondary
            disabled={busy}
            onPress={() =>
              router.push({ pathname: '/offer', params: { edit: '1' } })
            }
          >
            Change my travel choice
          </Button>
          <TextButton
            danger
            onPress={() => {
              if (!busy) setCancelling(true);
            }}
          >
            Cancel this day
          </TextButton>
        </>
      )}
      {review && (
        <>
          <Info amber icon="help">
            An inconclusive check doesn’t mean your plan failed. No reward is
            added until the simulated review is resolved.
          </Info>
          {plan.appealed ? (
            <Card style={{ backgroundColor: c.mint }}>
              <Text style={s.h3}>Your review request is saved</Text>
              <Text style={s.body}>
                Reference FP-{plan.id.replace('plan-', '').padStart(3, '0')}. In
                a live service, you would see an update here. This request stays
                inside the demo.
              </Text>
              <Button
                secondary
                onPress={() => dispatch({ type: 'resolve', id: plan.id })}
              >
                Demo: approve this review
              </Button>
            </Card>
          ) : (
            <Button
              onPress={() => dispatch({ type: 'appeal', id: plan.id })}
              icon="help"
            >
              Request a demo review
            </Button>
          )}
        </>
      )}
      {paid && (
        <Button onPress={() => router.replace('/wallet')} icon="arrow">
          See my reward
        </Button>
      )}
      {cancelled && (
        <Button onPress={() => router.replace('/offer')} icon="arrow">
          Choose another plan
        </Button>
      )}
      <Text style={[s.small, { textAlign: 'center' }]}>
        Sample plan · Simulated verification · No real money
      </Text>
      <ConfirmDialog
        visible={cancelling}
        title="Cancel this flexible day?"
        text="There’s no penalty. The €3 reward won’t be added, and you can choose another plan for this demo day."
        confirmLabel="Cancel my day"
        onClose={() => setCancelling(false)}
        onConfirm={() => {
          dispatch({ type: 'cancel', id });
          setCancelling(false);
        }}
      />
    </Page>
  );
}
