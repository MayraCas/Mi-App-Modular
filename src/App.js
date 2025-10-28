import React, { useContext } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Welcome from './components/Welcome/Welcome';
import TodoList from './components/TodoList/TodoList';
import UserDirectory from './components/UserDirectory/UserDirectory';
import ThemeContext from './context/ThemeContext'; // Importamos el contexto
import Layout from './components/Layout/Layout';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import NotFound from './components/NotFound/NotFound'; // Componente que crearás

function App() {
  const { theme } = useContext(ThemeContext); // Consumimos el contexto

  // Añadimos una clase 'dark' al div principal si el tema es oscuro
  return (
    <div className={`App ${theme}`}>
      {/* El componente <Routes> envuelve todas las rutas */}
      <Routes>
        {/* Esta es una "Ruta de Layout".
          Todas las rutas anidadas dentro se renderizarán DENTRO del <Outlet /> de Layout.
        */}
        <Route path="/" element={<Layout />}>

          {/* Rutas Hijas */}
          <Route index element={<Home />} />
          <Route path="tareas" element={<TodoList />} />
          <Route path="directorio" element={<UserDirectory />} />

          {/* Ruta "Catch-all" para 404 (No encontrado) */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
