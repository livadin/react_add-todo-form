import React, { useState } from 'react';

import { User } from '../../types/User';
import './AddTodoForm.scss';

type Props = {
  onAdd: (todo: { title: string; userId: number }) => void;
  users: User[];
};

export const AddTodoForm = ({ onAdd, users }: Props) => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('');

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title.trim()) {
      alert('Please enter a title');
      return;
    }

    if (!userId) {
      alert('Please choose a user');
      return;
    }

    onAdd({ title: title.trim(), userId: Number(userId) });

    setTitle('');
    setUserId('');
  };

  return (
    <form onSubmit={handleSubmit} className="AddTodoForm">
      <input
        type="text"
        placeholder="Enter title"
        value={title}
        onChange={handleTitleChange}
      />

      <select value={userId} onChange={handleUserIdChange}>
        <option value="" disabled>
          Choose a user
        </option>
        {users.map(user => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>

      <button type="submit">Add</button>
    </form>
  );
};
