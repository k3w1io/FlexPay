import { router } from 'expo-router';
import { Text, View } from 'react-native';
import { Icon } from '../../components/Icon';
import { Button, Card, Page, Pill, c, s } from '../../components/ui';
import { methodLabel } from '../../domain/demo';
import { useDemo } from '../../state/DemoProvider';

export default function PlansScreen() {
  const { state } = useDemo();
  return (
    <Page>
      <View style={{ gap: 8 }}>
        <Text style={s.eyebrow}>AT YOUR OWN PACE</Text>
        <Text style={s.title}>My flexible days</Text>
        <Text style={s.body}>Your plans and rewards, all in one place.</Text>
      </View>
      {!state.plans.length ? (
        <Card style={{ paddingVertical: 36, alignItems: 'center' }}>
          <View
            style={[
              s.bubble,
              {
                width: 65,
                height: 65,
                borderRadius: 32,
                backgroundColor: c.lime,
              },
            ]}
          >
            <Icon name="calendar" size={30} />
          </View>
          <Text style={s.h2}>Start with one day.</Text>
          <Text style={[s.body, { textAlign: 'center' }]}>
            You don’t need to change your whole routine. Find one flexible day
            that works for you.
          </Text>
          <View style={{ width: '100%', marginTop: 9 }}>
            <Button onPress={() => router.push('/offer')} icon="arrow">
              Explore my offer
            </Button>
          </View>
        </Card>
      ) : (
        <View style={{ gap: 15 }}>
          {[...state.plans].reverse().map((plan) => (
            <Card key={plan.id}>
              <View style={s.between}>
                <Text style={s.h3}>Mon, 5 Oct</Text>
                <Pill amber={plan.status === 'review'}>
                  {plan.status === 'paid'
                    ? 'Reward added'
                    : plan.status === 'review'
                      ? 'Needs review'
                      : plan.status === 'cancelled'
                        ? 'Cancelled'
                        : 'Upcoming'}
                </Pill>
              </View>
              <Text style={s.h2}>{methodLabel(plan.method)}</Text>
              <Text style={s.small}>06:00–10:00 out · 16:00–19:00 home</Text>
              <View style={s.between}>
                <Text style={s.body}>
                  {plan.status === 'paid'
                    ? '€3.00 earned'
                    : plan.status === 'cancelled'
                      ? 'No reward · No penalty'
                      : '€3.00 daily reward'}
                </Text>
              </View>
              <Button
                secondary
                onPress={() =>
                  router.push({
                    pathname: '/plan/[id]',
                    params: { id: plan.id },
                  })
                }
                icon="arrow"
              >
                View this day
              </Button>
            </Card>
          ))}
        </View>
      )}
      <Text style={s.small}>
        This demo has one offer for Monday, 5 October. You can replay it from
        You → Reset demo.
      </Text>
    </Page>
  );
}
