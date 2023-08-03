import { MaterialIcons } from '@expo/vector-icons';
import { Modal as BaseModal, Pressable, SafeAreaView, View } from 'react-native';

import { styles } from './Modal.styles';
import type { ModalProps } from './Modal.types';

export function Modal({ visible, onRequestClose, children }: ModalProps) {
  return (
    <BaseModal visible={visible} onRequestClose={onRequestClose} animationType="slide" transparent>
      <SafeAreaView style={styles.wrapper}>
        <View style={styles.body}>
          <Pressable onPress={onRequestClose} style={styles.closeButton}>
            <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
          </Pressable>
          <View style={styles.container}>{children}</View>
        </View>
      </SafeAreaView>
    </BaseModal>
  );
}
