import { Text, View } from 'react-native';
import { Icon } from './Icon';
import { s, c } from './ui';
import { useDemo } from '../state/DemoProvider';

export function RouteCard() {
  const { state } = useDemo();
  return (
    <View style={{ gap: 13 }}>
      <View style={s.row}>
        <View style={{ gap: 5, alignItems: 'center' }}>
          <View
            style={{
              width: 8,
              height: 8,
              borderWidth: 2,
              borderRadius: 4,
              borderColor: c.green,
            }}
          />
          <View style={{ height: 19, width: 1, backgroundColor: '#b6c5ad' }} />
          <Icon name="pin" size={13} />
        </View>
        <View style={{ flex: 1, gap: 18 }}>
          <Text style={s.h3}>{state.profile.home}</Text>
          <Text style={s.h3}>{state.profile.work}</Text>
        </View>
        <View style={{ alignItems: 'flex-end', gap: 7 }}>
          <Text style={s.eyebrow}>YOUR USUAL ROUTE</Text>
          <Text style={s.small}>N7 · Newlands Cross</Text>
          <Text style={[s.small, { color: '#648153' }]}>
            Candidate demo corridor
          </Text>
        </View>
      </View>
    </View>
  );
}
