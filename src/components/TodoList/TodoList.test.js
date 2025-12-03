import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from './TodoList';

// Definimos funciones vacías: () => {}
jest.mock('../../FirebaseConfig', () => ({ db: {} }));

jest.mock('firebase/firestore', () => ({
  collection: () => {},
  query: () => {},
  orderBy: () => {},
  where: () => {},
  doc: () => {},
  getDoc: () => {},
  getDocs: () => {},
  addDoc: () => {},
  deleteDoc: () => {},
  updateDoc: () => {},
  serverTimestamp: () => {},
  // onSnapshot debe devolver una función vacía para que el useEffect no explote al intentar limpiar.
  onSnapshot: (query, callback) => {
    callback({ forEach: () => {} }); // Simula que no hay datos
    return () => {}; // Simula la función de "desuscribirse"
  } 
}));

// Mock para el TodoItem
jest.mock('../TodoItem/TodoItem', () => {
  return function DummyTodoItem(props) {
    return <li data-testid="todo-item">{props.task.text}</li>;
  };
});

// Tests para el componente TodoList
describe('Componente TodoList', () => {

  test('Debe renderizar el título correctamente', () => {
    render(<TodoList />);
    const titleElement = screen.getByText(/Mi Lista de Tareas/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('Debe renderizar el input y el botón de añadir', () => {
    render(<TodoList />);
    const inputElement = screen.getByPlaceholderText(/Añade una nueva tarea.../i);
    const buttonElement = screen.getByRole('button', { name: /Añadir/i });
    expect(inputElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  test('Debe permitir escribir en el input', () => {
    render(<TodoList />);
    const inputElement = screen.getByPlaceholderText(/Añade una nueva tarea.../i);
    fireEvent.change(inputElement, { target: { value: 'Comprar leche' } });
    expect(inputElement.value).toBe('Comprar leche');
  });
  
  test('Debe mostrar las secciones de Historiales', () => {
      render(<TodoList />);
      const historyCompletedTitle = screen.getByText(/Historial de Tareas Completadas/i);
      const historyDeletedTitle = screen.getByText(/Historial de Tareas Eliminadas/i);
      expect(historyCompletedTitle).toBeInTheDocument();
      expect(historyDeletedTitle).toBeInTheDocument();
  });
});