import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { BackHeader, Button, Card, Info, Page, c, s } from '../components/ui';
import { useDemo } from '../state/DemoProvider';

export default function PreferencesScreen() {
  const { state, dispatch } = useDemo();
  const [home, setHome] = useState(state.profile.home);
  const [work, setWork] = useState(state.profile.work);
  const [days, setDays] = useState(state.profile.days);
  return (
    <Page
      footer={
        <Button
          onPress={() => {
            dispatch({
              type: 'profile',
              value: { ...state.profile, home, work, days },
            });
            if (router.canGoBack()) router.back();
            else router.replace('/profile');
          }}
          icon="check"
        >
          Save my preferences
        </Button>
      }
    >
      <BackHeader title="My commute" />
      <View style={{ gap: 9 }}>
        <Text style={s.title}>Fit FlexPay around{'\n'}your everyday.</Text>
        <Text style={s.body}>
          Tell us about your usual car commute. Offers should fit your routine.
        </Text>
      </View>
      <Card>
        <Text style={s.h3}>Where do you start?</Text>
        <Options
          values={['Naas', 'Newbridge', 'Kill']}
          value={home}
          onChange={setHome}
        />
        <Text style={[s.h3, { marginTop: 8 }]}>Where are you heading?</Text>
        <Options
          values={['Dublin', 'Red Cow']}
          value={work}
          onChange={setWork}
        />
      </Card>
      <Card>
        <Text style={s.h3}>Which days do you usually drive?</Text>
        <Text style={s.body}>
          Only include days you would normally take your own car.
        </Text>
        <View style={{ flexDirection: 'row', gap: 6, flexWrap: 'wrap' }}>
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day) => (
            <Pressable
              accessibilityRole="checkbox"
              accessibilityLabel={day}
              aria-checked={days.includes(day)}
              accessibilityState={{ checked: days.includes(day) }}
              key={day}
              onPress={() =>
                setDays((prev) =>
                  prev.includes(day)
                    ? prev.filter((d) => d !== day)
                    : [...prev, day],
                )
              }
              style={{
                minHeight: 44,
                minWidth: 48,
                flex: 1,
                borderRadius: 12,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: days.includes(day) ? c.green : c.mint,
              }}
            >
              <Text
                style={{
                  color: days.includes(day) ? c.lime : c.green,
                  fontWeight: '700',
                  fontSize: 12,
                }}
              >
                {day}
              </Text>
            </Pressable>
          ))}
        </View>
        <Text style={s.small}>
          {days.includes('Mon')
            ? 'Monday’s demo offer matches your commute days.'
            : 'Monday’s demo offer won’t be available until you select Monday.'}
        </Text>
      </Card>
      <Info icon="pin">
        This prototype uses sample places around the N7. No location access or
        vehicle details are needed.
      </Info>
    </Page>
  );
}
function Options({
  values,
  value,
  onChange,
}: {
  values: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
      {values.map((v) => (
        <Pressable
          key={v}
          accessibilityRole="radio"
          accessibilityLabel={v}
          aria-checked={v === value}
          accessibilityState={{ checked: v === value }}
          onPress={() => onChange(v)}
          style={{
            minHeight: 45,
            padding: 13,
            borderRadius: 12,
            backgroundColor: v === value ? c.green : c.mint,
          }}
        >
          <Text
            style={{
              color: v === value ? c.lime : c.green,
              fontSize: 13,
              fontWeight: '700',
            }}
          >
            {v}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}
