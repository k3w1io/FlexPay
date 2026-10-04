import { Modal, Text, View } from 'react-native';
import { Button, c, s } from './ui';

export function ConfirmDialog({
  visible,
  title,
  text,
  confirmLabel,
  onConfirm,
  onClose,
}: {
  visible: boolean;
  title: string;
  text: string;
  confirmLabel: string;
  onConfirm: () => void;
  onClose: () => void;
}) {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: '#13281ecc',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 28,
        }}
      >
        <View
          accessibilityViewIsModal
          style={{
            backgroundColor: c.bg,
            padding: 24,
            borderRadius: 22,
            width: '100%',
            maxWidth: 360,
            gap: 17,
          }}
        >
          <Text style={s.h2}>{title}</Text>
          <Text style={s.body}>{text}</Text>
          <Button onPress={onConfirm}>{confirmLabel}</Button>
          <Button secondary onPress={onClose}>
            Go back
          </Button>
        </View>
      </View>
    </Modal>
  );
}
