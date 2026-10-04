import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, Switch, Text, View } from 'react-native';
import { ConfirmDialog } from '../../components/ConfirmDialog';
import { Icon } from '../../components/Icon';
import {
  Button,
  Card,
  Choice,
  Page,
  TextButton,
  c,
  s,
} from '../../components/ui';
import { useDemo } from '../../state/DemoProvider';

export default function ProfileScreen() {
  const { state, dispatch } = useDemo();
  const [resetting, setResetting] = useState(false);
  return (
    <Page>
      <Text style={s.title}>Your life.{'\n'}Your flexibility.</Text>
      <Card>
        <View style={s.row}>
          <View
            style={[
              s.bubble,
              {
                height: 64,
                width: 64,
                borderRadius: 32,
                backgroundColor: c.lilac,
              },
            ]}
          >
            <Text style={[s.h2, { fontSize: 23 }]}>AM</Text>
          </View>
          <View style={{ gap: 4 }}>
            <Text style={s.h2}>Aoife Murphy</Text>
            <Text style={s.small}>aoife.demo · Fictional demo account</Text>
            <Text style={s.small}>
              {state.profile.home} → {state.profile.work}
            </Text>
          </View>
        </View>
      </Card>
      <Card>
        <SettingsRow
          title="My commute"
          subtitle={`${state.profile.days.length ? state.profile.days.join(' · ') : 'No regular commute days'}`}
          icon="pin"
          onPress={() => router.push('/preferences')}
        />
        <View style={s.divider} />
        <View style={s.row}>
          <View style={s.bubble}>
            <Icon name="bell" />
          </View>
          <View style={{ flex: 1, gap: 4 }}>
            <Text style={s.h3}>Plan reminders</Text>
            <Text style={s.small}>Saved preference · Demo only</Text>
          </View>
          <Switch
            accessibilityLabel="Plan reminders"
            value={state.profile.reminders}
            onValueChange={(reminders) =>
              dispatch({
                type: 'profile',
                value: { ...state.profile, reminders },
              })
            }
            trackColor={{ false: '#cbd4c4', true: '#9ec076' }}
            thumbColor={state.profile.reminders ? c.green : c.white}
          />
        </View>
        <View style={s.divider} />
        <SettingsRow
          title="Help & how it works"
          subtitle="Rewards, privacy and changing plans"
          icon="help"
          onPress={() => router.push('/help')}
        />
      </Card>
      <View style={{ gap: 7 }}>
        <Text style={s.h2}>Make the demo yours</Text>
        <Text style={s.body}>
          Choose the next simulated check outcome, or reset Aoife’s account to
          rehearse again.
        </Text>
      </View>
      <View style={{ gap: 10 }}>
        <Choice
          title="Clear demo check"
          subtitle="Completing a day adds the €3 reward."
          icon="check"
          selected={state.scenario === 'clear'}
          onPress={() => dispatch({ type: 'scenario', value: 'clear' })}
        />
        <Choice
          title="Inconclusive demo check"
          subtitle="Reward is held; the customer can request review."
          icon="help"
          selected={state.scenario === 'unknown'}
          onPress={() => dispatch({ type: 'scenario', value: 'unknown' })}
        />
      </View>
      <Button secondary onPress={() => setResetting(true)} icon="refresh">
        Reset demo
      </Button>
      <TextButton onPress={() => dispatch({ type: 'logout' })}>
        Sign out
      </TextButton>
      <Text style={s.small}>
        Customer prototype · Demo date: 5 October 2026{'\n'}Progress is saved
        locally on this device. Reset clears all sample plans, transfers and
        preferences.
      </Text>
      <ConfirmDialog
        visible={resetting}
        title="Start the demo again?"
        text="This clears demo plans and transfers, restores Aoife’s preferences and puts the sample €12 back in her wallet."
        confirmLabel="Reset demo account"
        onClose={() => setResetting(false)}
        onConfirm={() => {
          dispatch({ type: 'reset' });
          setResetting(false);
          router.replace('/');
        }}
      />
    </Page>
  );
}
function SettingsRow({
  title,
  subtitle,
  icon,
  onPress,
}: {
  title: string;
  subtitle: string;
  icon: 'pin' | 'help';
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={title}
      onPress={onPress}
      style={({ pressed }) => [
        s.row,
        { minHeight: 62, opacity: pressed ? 0.7 : 1 },
      ]}
    >
      <View style={s.bubble}>
        <Icon name={icon} />
      </View>
      <View style={{ flex: 1, gap: 4 }}>
        <Text style={s.h3}>{title}</Text>
        <Text style={s.small}>{subtitle}</Text>
      </View>
      <Icon name="chevron" size={18} />
    </Pressable>
  );
}
