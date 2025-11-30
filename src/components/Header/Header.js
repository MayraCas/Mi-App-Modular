import React from 'react';
import './Header.css';
import ThemeSwitcher from '../ThemeSwitcher'; // Importamos el interruptor de tema
import { Link } from 'react-router-dom';
import { PiFlowerTulip } from "react-icons/pi";
import Logo from './logoflower.jpg';

const Header = () => {
  return (
    <header className="app-header">
      <h1>Mi Aplicación Modular</h1> {/* <-- Cambio intencional */}
      <div className="logo-nav">
      <img src={Logo} alt="flor morada" className="logo-f" style={{ width: '50px', height: '50px', borderRadius: '100%' }} />
        <nav>
          
          <Link to="/">Inicio</Link>
          <Link to="/tareas">Tareas</Link>
          <Link to="/directorio">Directorio</Link>
        </nav>
      </div>
      <ThemeSwitcher />
    </header>
  );
};

export default Header;