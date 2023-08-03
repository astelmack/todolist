export type ToDoItem = {
  title: string;
  description?: string;
};

export type TodoListState = {
  loading: boolean;
  todoList: ToDoItem[];
};

export type TodoListContextType = {
  state: TodoListState;
  addItem: (newItem: ToDoItem) => ToDoItem; // TODO: This should be a promise later
  removeItem: (removeItem: ToDoItem) => ToDoItem; // TODO: This should be a promise later
};
