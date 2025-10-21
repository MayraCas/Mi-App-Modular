import React, { useContext } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Welcome from './components/Welcome/Welcome';
import TodoList from './components/TodoList/TodoList';
import UserDirectory from './components/UserDirectory/UserDirectory';
import ThemeSwitcher from './components/ThemeSwitcher'; // Importamos el interruptor
import ThemeContext from './context/ThemeContext'; // Importamos el contexto

function App() {
  const { theme } = useContext(ThemeContext); // Consumimos el contexto

  // Añadimos una clase 'dark' al div principal si el tema es oscuro
  return (
    <div className={`App ${theme}`}>
      <Header/>
      <main>
        <TodoList />
        <UserDirectory />
      </main>
    </div>
  );
}

export default App;
