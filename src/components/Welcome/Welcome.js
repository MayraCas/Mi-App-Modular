import React from 'react';
import coneju from './conejumamado.jpg'

const Welcome = ({ nombre }) => {
    if (nombre === "Desarrollador") {
        return (
            <div>
                <h2>Bienvenido, {nombre}!, eres un crack</h2>
                <p>Bv</p>
                <img src={coneju} alt="Conejo mamado" style={{ width: '200px', height: '200px' }} />
            </div>
        );
    } else {
        return (
            <div>
                <h2>Bienvenido, {nombre}!</h2>
                <p>Este es un ejemplo de un componente modularizado</p>
            </div>
        );
    }
};

export default Welcome;