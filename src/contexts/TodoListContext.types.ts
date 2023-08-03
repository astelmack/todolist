export type ToDoItem = {
  id: string;
  complete: boolean;
  title: string;
};

export type TodoListState = {
  loading: boolean;
  todoList: ToDoItem[];
};

export type TodoListContextType = {
  state: TodoListState;
  addItem: (item: ToDoItem) => ToDoItem;
  removeItem: (item: ToDoItem) => ToDoItem;
  updateItem: (item: ToDoItem) => ToDoItem;
};
