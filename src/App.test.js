import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import ThemeContext from './context/ThemeContext';

// Este test verifica que la App carga y aplica la clase del tema correctamente
test('renderiza la aplicación con el tema light y sin errores', () => {
  
  // Definimos el valor falso (mock) que tendrá nuestro contexto
  const mockThemeValue = { theme: 'light' };

  // Usamos 'render' para montar el componente en el DOM virtual
  const { container } = render(
    // Envolvemos App en el ThemeContext.Provider para que 'useContext' funcione
    <ThemeContext.Provider value={mockThemeValue}>
      {/* Envolvemos en MemoryRouter. 
         Esto simula el navegador. 'initialEntries' dice: "empieza en la ruta /" 
      */}
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    </ThemeContext.Provider>
  );

  // Verificamos lógica de la App: ¿El div principal tiene la clase "App light"?
  const appDiv = container.querySelector('.App');
  
  expect(appDiv).toBeInTheDocument();
  expect(appDiv).toHaveClass('light');
});