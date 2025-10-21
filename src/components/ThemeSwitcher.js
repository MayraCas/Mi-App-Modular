import React, { useContext } from 'react';
import ThemeContext from '../context/ThemeContext';
import { AiOutlineMoon } from "react-icons/ai";
import { MdOutlineWbSunny } from "react-icons/md";
import './ThemeSwitcher.css'; // Crearemos este archivo

import IconMoon from './Icons/IconMoon'; // <-- Importar
import IconSun from './Icons/IconSun';   // <-- Importar

const ThemeSwitcher = () => {
  // 3. Usamos el hook useContext para consumir el contexto
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button onClick={toggleTheme} className="theme-switcher-btn">

      {/*{theme === 'light' ? < AiOutlineMoon size = '30px' color = '#352344ff'/> :
       < MdOutlineWbSunny size = '30px' color = '#ffffffff'/>}
      */}

      {theme === 'light' ? <IconMoon /> : <IconSun />}

    </button>
  );
};

export default ThemeSwitcher;