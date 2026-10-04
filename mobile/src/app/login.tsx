import { router } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import { BrandMark, Icon } from '../components/Icon';
import { JourneyArt } from '../components/JourneyArt';
import { Button, Field, Page, s, c } from '../components/ui';
import { DEMO_LOGIN } from '../domain/demo';
import { useDemo } from '../state/DemoProvider';

export default function LoginScreen() {
  const { dispatch } = useDemo();
  const [username, setUsername] = useState<string>(DEMO_LOGIN.username);
  const [password, setPassword] = useState<string>(DEMO_LOGIN.password);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const signIn = () => {
    if (
      username.trim().toLowerCase() !== DEMO_LOGIN.username ||
      password !== DEMO_LOGIN.password
    ) {
      setError('Use the demo details below to sign in as Aoife.');
      return;
    }
    dispatch({ type: 'login' });
    router.replace('/');
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={s.grow}
    >
      <Page>
        <View style={[s.row, { marginTop: 3 }]}>
          <BrandMark />
          <Text
            style={{
              fontSize: 27,
              color: c.green,
              fontWeight: '800',
              letterSpacing: -1.2,
            }}
          >
            FlexPay
          </Text>
        </View>
        <JourneyArt />
        <View style={{ gap: 9 }}>
          <Text style={s.title}>
            Your commute.{'\n'}A little more rewarding.
          </Text>
          <Text style={s.body}>
            A flexible day can make a difference. Let’s find one that works for
            you.
          </Text>
        </View>
        <View style={{ gap: 16 }}>
          <Field
            label="Username"
            value={username}
            onChangeText={(v) => {
              setUsername(v);
              setError('');
            }}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
          />
          <View style={{ gap: 7 }}>
            <Text style={s.h3}>Password</Text>
            <View style={{ justifyContent: 'center' }}>
              <TextInput
                accessibilityLabel="Password"
                value={password}
                onChangeText={(v) => {
                  setPassword(v);
                  setError('');
                }}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
                style={[s.input, { paddingRight: 58 }]}
                returnKeyType="go"
                onSubmitEditing={signIn}
              />
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={
                  showPassword ? 'Hide password' : 'Show password'
                }
                onPress={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: 5,
                  width: 44,
                  height: 44,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon name="eye" size={20} />
              </Pressable>
            </View>
          </View>
          {!!error && (
            <Text accessibilityRole="alert" style={s.error}>
              {error}
            </Text>
          )}
          <Button onPress={signIn} icon="arrow">
            Sign in to the demo
          </Button>
        </View>
        <View
          style={{
            backgroundColor: c.mint,
            borderRadius: 14,
            padding: 14,
            gap: 7,
          }}
        >
          <Text style={s.h3}>Meet Aoife, your demo commuter</Text>
          <Text style={s.small}>
            Naas → Dublin · Account details are prefilled.
          </Text>
          {!!error && (
            <>
              <Text selectable style={s.small}>
                Username: {DEMO_LOGIN.username}
              </Text>
              <Text selectable style={s.small}>
                Password: {DEMO_LOGIN.password}
              </Text>
              <Button
                secondary
                onPress={() => {
                  setUsername(DEMO_LOGIN.username);
                  setPassword(DEMO_LOGIN.password);
                  setError('');
                }}
              >
                Restore demo details
              </Button>
            </>
          )}
        </View>
        <Text style={[s.small, { textAlign: 'center' }]}>
          This is a fictional demo account. No registration needed.
        </Text>
      </Page>
    </KeyboardAvoidingView>
  );
}
