import { MaterialIcons } from '@expo/vector-icons';
import { useCallback, useEffect, useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import uuid from 'react-native-uuid';

import { styles } from './TodoItemForm.styles';
import { TodoItemFormProps } from './TodoItemForm.types';
import { useTodoList } from '../hooks/useTodoList';

export function TodoItemForm({ todoItem, onSubmit }: TodoItemFormProps) {
  const { addItem, updateItem } = useTodoList();
  const [title, setTitle] = useState<string | undefined>(todoItem ? todoItem.title : undefined);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (todoItem) {
      setDisabled(!title || todoItem.title === title);
    } else {
      setDisabled(!title);
    }
  }, [todoItem, title]);

  const pressHandler = useCallback(() => {
    if (title) {
      if (todoItem) {
        updateItem({ ...todoItem, title: title });
      } else {
        // Casting as string here due to the fact that no argument usage should result in string
        addItem({ id: uuid.v4() as string, title: title, complete: false });
      }
      onSubmit();
    }
  }, [title, todoItem, onSubmit, updateItem, addItem]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Todo Item Title:</Text>
      <TextInput
        style={styles.input}
        textContentType="none"
        onChangeText={setTitle}
        value={title}
      />
      <Pressable style={styles.button} disabled={disabled} onPress={pressHandler}>
        <MaterialIcons name="save" size={24} color="white" />
        <Text selectable={false} style={styles.buttonLabel}>
          {todoItem ? 'Save Changes' : 'Save Item'}
        </Text>
      </Pressable>
    </View>
  );
}
