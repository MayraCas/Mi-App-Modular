import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';

// Esto evita que el test falle si ThemeSwitcher necesita contextos complejos.
jest.mock('../ThemeSwitcher', () => () => <div>Mock Switch</div>);

test('debe mostrar el título, el logo y los enlaces de navegación', () => {
  // 2. RENDERIZADO
  render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  );

  // VERIFICACIONES (ASSERTS)

  // Verificar el Título (h1)
  // Buscamos un encabezado de nivel 1 (h1)
  const titleElement = screen.getByRole('heading', { level: 1 });
  expect(titleElement).toHaveTextContent('Mi Aplicación Modular');

  // Verificar la Imagen (Logo)
  const logoImage = screen.getByAltText('flor morada');
  expect(logoImage).toBeInTheDocument();
  expect(logoImage).toHaveClass('logo-f'); // Verificamos que tenga la clase CSS correcta

  // Verificar los Enlaces
  // Verificamos que los textos de los links existan
  expect(screen.getByText('Inicio')).toBeInTheDocument();
  expect(screen.getByText('Tareas')).toBeInTheDocument();
  expect(screen.getByText('Directorio')).toBeInTheDocument();
});