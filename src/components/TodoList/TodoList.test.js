import React from 'react';
import { render, screen } from '@testing-library/react';
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

jest.mock('../TodoItem/TodoItem', () => () => <div>Item Falso</div>);

test('TodoList se renderiza sin explotar', () => {
  // 1. Renderizamos
  render(<TodoList />);

  // Verificamos que el título aparezca.
  // Si esto pasa, significa que el componente cargó bien.
  expect(screen.getByText('Mi Lista de Tareas')).toBeInTheDocument();
  
  // Verificamos que los historiales estén vacíos (porque el mock no devuelve datos)
  expect(screen.getByText('No hay tareas competadas')).toBeInTheDocument();
});