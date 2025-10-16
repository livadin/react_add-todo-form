import './App.scss';
import { TodoList } from './components/TodoList';
import { TodoAgregate } from './types/TodoAgregate';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { AddTodoForm } from './components/AddTodoForm';
import { useState } from 'react';

export type TodoDraft = {
  title: string;
  userId: number;
};

export const App = () => {
  const [todos, setTodos] = useState<TodoAgregate[]>(() => {
    const prepared: TodoAgregate[] = [];

    for (const todo of todosFromServer) {
      const user = usersFromServer.find(u => u.id === todo.userId);

      if (!user) {
        continue;
      }

      prepared.push({ ...todo, user });
    }

    return prepared;
  });

  const handleAddTodo = ({ title, userId }: TodoDraft) => {
    const userIdNum = Number(userId);
    const user = usersFromServer.find(u => u.id === userIdNum);

    if (!user) {
      return;
    }

    setTodos(prev => {
      const nextId =
        prev.length > 0
          ? Math.max(...prev.map(todoItem => todoItem.id)) + 1
          : 1;
      const newTodo: TodoAgregate = {
        id: nextId,
        title,
        completed: false,
        userId: userIdNum,
        user,
      };

      return [...prev, newTodo];
    });
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <AddTodoForm onAdd={handleAddTodo} users={usersFromServer} />

      <TodoList todos={todos} />
    </div>
  );
};
