import React from 'react';
import './Header.css';
import ThemeSwitcher from '../ThemeSwitcher'; // Importamos el interruptor de tema

const Header = () => {
  return (
    <header className="app-header">
      <h1>Mi Aplicación Modular</h1>
      <div className="theme-button-container">
        <ThemeSwitcher /> {/* Añadimos el interruptor de tema */}
      </div>
    </header>
  );
};

export default Header;