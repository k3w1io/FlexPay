import type { ReactNode } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  type TextInputProps,
  type ViewStyle,
} from 'react-native';
import { router } from 'expo-router';
import { Icon, type IconName } from './Icon';

export const c = {
  ink: '#183e31',
  muted: '#627168',
  green: '#173c31',
  lime: '#d9f69d',
  bg: '#f7f8f2',
  white: '#ffffff',
  line: '#e2e7de',
  mint: '#ecf3e4',
  lilac: '#ece7f5',
  amber: '#fcf0d7',
  red: '#9a4032',
};
export const s = StyleSheet.create({
  page: { flex: 1, backgroundColor: c.bg },
  content: { padding: 23, paddingBottom: 32, gap: 20 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  between: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  grow: { flex: 1 },
  title: {
    fontSize: 31,
    fontWeight: '700',
    color: c.ink,
    letterSpacing: -1.2,
    lineHeight: 36,
  },
  h2: {
    fontSize: 20,
    lineHeight: 26,
    fontWeight: '700',
    color: c.ink,
    letterSpacing: -0.5,
  },
  h3: { fontSize: 16, lineHeight: 22, fontWeight: '700', color: c.ink },
  body: { fontSize: 14, lineHeight: 21, color: c.muted },
  small: { fontSize: 12, lineHeight: 18, color: c.muted },
  eyebrow: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
    color: c.muted,
  },
  card: {
    padding: 19,
    borderRadius: 20,
    backgroundColor: c.white,
    borderWidth: 1,
    borderColor: c.line,
    gap: 13,
  },
  divider: { height: 1, backgroundColor: c.line },
  link: { fontSize: 14, fontWeight: '700', color: c.green },
  error: { fontSize: 13, lineHeight: 19, color: c.red },
  input: {
    borderWidth: 1,
    borderColor: '#cbd5c8',
    borderRadius: 13,
    paddingHorizontal: 15,
    paddingVertical: 14,
    minHeight: 52,
    color: c.ink,
    backgroundColor: c.white,
    fontSize: 15,
  },
  center: { alignItems: 'center', justifyContent: 'center' },
  bubble: {
    height: 44,
    width: 44,
    borderRadius: 14,
    backgroundColor: c.mint,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export function Page({
  children,
  footer,
}: {
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <View style={s.page}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={s.content}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
      {footer && (
        <View
          style={{
            padding: 19,
            borderTopWidth: 1,
            borderColor: c.line,
            backgroundColor: c.bg,
          }}
        >
          {footer}
        </View>
      )}
    </View>
  );
}
export function Button({
  children,
  onPress,
  secondary = false,
  disabled = false,
  icon,
  testID,
}: {
  children: string;
  onPress: () => void;
  secondary?: boolean;
  disabled?: boolean;
  icon?: IconName;
  testID?: string;
}) {
  return (
    <Pressable
      testID={testID}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => ({
        minHeight: 53,
        paddingHorizontal: 18,
        paddingVertical: 15,
        borderRadius: 15,
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: secondary ? c.white : c.green,
        borderWidth: secondary ? 1 : 0,
        borderColor: c.line,
        opacity: disabled ? 0.45 : pressed ? 0.8 : 1,
      })}
    >
      <Text
        style={{
          color: secondary ? c.green : c.lime,
          fontSize: 15,
          fontWeight: '700',
          flexShrink: 1,
        }}
      >
        {children}
      </Text>
      {icon && (
        <Icon name={icon} size={18} color={secondary ? c.green : c.lime} />
      )}
    </Pressable>
  );
}
export function TextButton({
  children,
  onPress,
  danger = false,
}: {
  children: string;
  onPress: () => void;
  danger?: boolean;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => ({
        minHeight: 44,
        justifyContent: 'center',
        opacity: pressed ? 0.6 : 1,
      })}
    >
      <Text style={[s.link, { color: danger ? c.red : c.green }]}>
        {children}
      </Text>
    </Pressable>
  );
}
export function BackHeader({ title }: { title: string }) {
  return (
    <View style={s.row}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Go back"
        onPress={() =>
          router.canGoBack() ? router.back() : router.replace('/')
        }
        style={[s.bubble, { width: 42, height: 42, backgroundColor: c.white }]}
      >
        <Icon name="back" size={21} />
      </Pressable>
      <Text style={s.h3}>{title}</Text>
    </View>
  );
}
export function Card({
  children,
  style,
}: {
  children: ReactNode;
  style?: ViewStyle;
}) {
  return <View style={[s.card, style]}>{children}</View>;
}
export function Pill({
  children,
  amber = false,
}: {
  children: string;
  amber?: boolean;
}) {
  return (
    <View
      style={{
        backgroundColor: amber ? c.amber : c.mint,
        alignSelf: 'flex-start',
        borderRadius: 99,
        paddingHorizontal: 10,
        paddingVertical: 5,
      }}
    >
      <Text
        style={{
          fontSize: 11,
          fontWeight: '700',
          color: amber ? '#725117' : '#426147',
        }}
      >
        {children}
      </Text>
    </View>
  );
}
export function Field({ label, ...props }: TextInputProps & { label: string }) {
  return (
    <View style={{ gap: 7 }}>
      <Text style={s.h3}>{label}</Text>
      <TextInput
        accessibilityLabel={label}
        placeholderTextColor={c.muted}
        style={s.input}
        {...props}
      />
    </View>
  );
}
export function Info({
  children,
  icon = 'shield',
  amber = false,
}: {
  children: string;
  icon?: IconName;
  amber?: boolean;
}) {
  return (
    <View
      style={{
        backgroundColor: amber ? c.amber : c.mint,
        borderRadius: 15,
        padding: 14,
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 10,
      }}
    >
      <Icon name={icon} size={19} />
      <Text
        style={[s.small, { flex: 1, color: amber ? '#71551f' : '#49604b' }]}
      >
        {children}
      </Text>
    </View>
  );
}
export function Choice({
  title,
  subtitle,
  icon,
  selected,
  onPress,
}: {
  title: string;
  subtitle: string;
  icon: IconName;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="radio"
      aria-checked={selected}
      accessibilityState={{ checked: selected }}
      accessibilityLabel={title}
      onPress={onPress}
      style={({ pressed }) => ({
        borderWidth: selected ? 2 : 1,
        borderColor: selected ? c.green : c.line,
        padding: selected ? 15 : 16,
        borderRadius: 17,
        backgroundColor: selected ? c.mint : c.white,
        flexDirection: 'row',
        gap: 13,
        alignItems: 'center',
        opacity: pressed ? 0.8 : 1,
      })}
    >
      <View style={s.bubble}>
        <Icon name={icon} size={22} />
      </View>
      <View style={{ flex: 1, gap: 4 }}>
        <Text style={s.h3}>{title}</Text>
        <Text style={s.small}>{subtitle}</Text>
      </View>
      <View
        style={{
          width: 20,
          height: 20,
          borderRadius: 10,
          borderWidth: selected ? 6 : 1.5,
          borderColor: selected ? c.green : '#bac5b6',
        }}
      />
    </Pressable>
  );
}
