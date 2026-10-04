import { Tabs } from 'expo-router';
import { Icon } from '../../components/Icon';
import { c } from '../../components/ui';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: c.green,
        tabBarInactiveTintColor: '#788277',
        tabBarStyle: {
          backgroundColor: c.bg,
          borderTopColor: c.line,
          height: 73,
          paddingBottom: 10,
          paddingTop: 9,
        },
        tabBarLabelStyle: { fontSize: 10, fontWeight: '700', marginTop: 3 },
        sceneStyle: { backgroundColor: c.bg },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Today',
          tabBarIcon: ({ color }) => (
            <Icon name="home" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="plans"
        options={{
          title: 'My plans',
          tabBarIcon: ({ color }) => (
            <Icon name="calendar" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          title: 'Wallet',
          tabBarIcon: ({ color }) => (
            <Icon name="wallet" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'You',
          tabBarIcon: ({ color }) => (
            <Icon name="user" size={22} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
