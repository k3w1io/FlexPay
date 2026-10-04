import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Icon } from '../components/Icon';
import { BackHeader, Card, Info, Page, c, s } from '../components/ui';

const answers = [
  {
    q: 'How does a flexible day work?',
    a: 'Choose a day when you would normally drive the demo corridor. Pick a practical alternative for both journeys, save your plan, then confirm your day. The prototype runs a simulated check and shows the reward or a review.',
  },
  {
    q: 'How much can I earn?',
    a: 'This demo uses a fixed €3 reward per completed day, including both the outward and return journeys. It is one daily reward, rather than €3 per journey. Aoife starts with a fictional €12 balance.',
  },
  {
    q: 'What if my plans change?',
    a: 'You can change your travel choice or cancel before completing your demo day. There’s no penalty for cancelling; that day simply earns no reward. Pick a day that works for your circumstances.',
  },
  {
    q: 'What if the check is inconclusive?',
    a: 'An inconclusive result holds the reward for review. It isn’t treated as evidence that you drove. Open your plan to request a demo review. The presenter can approve that fictional review to show the customer journey.',
  },
  {
    q: 'Are you tracking my location?',
    a: 'No. This prototype does not request GPS access, read number plates, connect to roadside cameras or collect a real travel history. Verification outcomes are simulated. A future pilot would need an agreed verification process and clear participant information.',
  },
  {
    q: 'Can I withdraw real money?',
    a: 'No. The wallet and transfer are demonstrations. There’s no payment provider, bank connection or Leap account integration. No money moves, and the app never asks for bank details.',
  },
  {
    q: 'Is this a live N7 programme?',
    a: 'No. Newlands Cross towards Red Cow is a candidate corridor being researched. The offer, morning and return windows, eligibility, rewards and outcomes shown here are a demo scenario. The prototype does not claim measured congestion or carbon savings.',
  },
];
export default function HelpScreen() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Page>
      <BackHeader title="Help & how it works" />
      <View style={{ gap: 9 }}>
        <Text style={s.title}>A few answers.{'\n'}A clearer commute.</Text>
        <Text style={s.body}>
          Everything you need to feel comfortable choosing a flexible day.
        </Text>
      </View>
      <View style={{ gap: 10 }}>
        {answers.map((item, index) => (
          <Card key={item.q}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={item.q}
              aria-expanded={open === index}
              accessibilityState={{ expanded: open === index }}
              onPress={() => setOpen(open === index ? null : index)}
              style={[s.between, { minHeight: 36 }]}
            >
              <Text style={[s.h3, { flex: 1 }]}>{item.q}</Text>
              <Icon name={open === index ? 'close' : 'chevron'} size={18} />
            </Pressable>
            {open === index && <Text style={s.body}>{item.a}</Text>}
          </Card>
        ))}
      </View>
      <Info icon="help">
        For this hackathon, ask the presenter for help. Review requests stay
        inside this demo and are not sent to a support team.
      </Info>
      <Text style={[s.small, { color: c.muted }]}>
        Designed around a voluntary choice. You stay in control of your day.
      </Text>
    </Page>
  );
}
