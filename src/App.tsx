import React, { useState, useRef, useCallback, useReducer } from 'react';
import TodoTemplate from 'components/TodoTemplate';
import TodoInsert from 'components/TodoInsert';
import TodoList from 'components/TodoList';

type Action = { type: 'INSERT', todo: TodoItem } | { type: 'REMOVE', id: number } | { type: 'TOGGLE', id: number };

interface TodoItem {
  id: number;
  text: string;
  checked: boolean;
}

function createBulkTodos() {
  const array = [];

  for (let i = 0; i <= 2500; i++) {
    array.push({
      id: i,
      text: `할 일 ${i}`,
      checked: false
    });
  }

  return array;
}

function todoReducer(todos: TodoItem[], action: Action) {
  switch (action.type) {
    case 'INSERT':
      return todos.concat(action.todo);
    case 'REMOVE':
      return todos.filter((todo: TodoItem) => todo.id !== action.id);
    case 'TOGGLE':
      return todos.map((todo : TodoItem) => todo.id === action.id ? { ...todo, checked: !todo.checked } : todo );
    default:
      return todos;
  }
}

const App = () => {
  const [todos, dispatch] = useReducer(todoReducer, undefined, createBulkTodos);

  


  // const [todos, setTodos] = useState(createBulkTodos())
  // useState([
  //   {
  //     id: 1,
  //     text: '리액트의 기초 알아보기',
  //     checked: true,
  //   },
  //   {
  //     id: 2,
  //     text: '리액트의 스타일링해 보기',
  //     checked: true,
  //   },
  //   {
  //     id: 3,
  //     text: '일정 관리 앱 만들어보기',
  //     checked: false,
  //   },
  // ]);

  // const nextId = useRef(4);
  const nextId = useRef(2501);

  const onInsert = useCallback((text: string) => {
    const todo = {
      id: nextId.current,
      text,
      checked: false
    };

    // setTodos(todos => todos.concat(todo));

    dispatch({ type: 'INSERT', todo });
    nextId.current += 1;
  }, []);

  const onRemove = useCallback((id: number) => {
    // setTodos(todos => todos.filter(todo => todo.id !== id));
    dispatch({ type: 'REMOVE', id });
  }, []);

  const onToggle = useCallback((id: number) => {
    // setTodos(todos => todos.map(todo => todo.id === id ? { ...todo, checked: !todo.checked } : todo ))
    dispatch({ type: 'TOGGLE', id });
  }, []);

  return (
    <div className="App">
      <TodoTemplate>
        <TodoInsert onInsert={onInsert} />
        <TodoList 
          todos={todos} 
          onRemove={onRemove} 
          onToggle={onToggle}
        />
      </TodoTemplate>
    </div>
  );
};

export default App;
