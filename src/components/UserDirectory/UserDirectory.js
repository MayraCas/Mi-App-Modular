import React, { useState, useEffect} from 'react';
import './UserDirectory.css';

const UserDirectory = () => {

    // Estado para guardar la lista de usuarios
    const [users, setUsers] = useState([]);
    // Estado para saber si los datos están cargando
    const [loading, setLoading] = useState(true);
    // Estado para guardar un posible error
    const [error, setError] = useState(null);

    // Hook useEffect para realizar efectos secundarios
    useEffect(() => {
        // Usamos la API 'fetch' del navegador para hacer la petición
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => {
            if (!response.ok) {
                throw new Error('La respuesta de la red no fue staisfactoria');
            }
            return response.json();
        })
        .then(data => {
            // Guardamos los usuarios en el estado
            setUsers(data);
            // Limpiamos cualquier error previo
            setError(null);
        })
        .catch(error => {
            // Guardamos el mensaje de error
            setError(error.message);
            // Limpiamos los datos de usuarios
            setUsers([]);
        })
        .finally(() => {
            // La carga ha termiando (con éxito o error)
            setLoading(false);
        })
    }, []); // <-- El arreglo de dependencias es importante, evita bucles infinitos

    return (
        <div className="user-directory">
            <h2>Directorio de Usuarios</h2>
            {/* Contenido dinámico */}

            {loading && <p>Cargando usuarios...</p>}

            {error && <p className="error-message">Error:{error}</p>}

            {!loading && !error && (
                <ul>
                    {users.map(user => (
                        <li key={user.id} className="user-card">
                            <h3>{user.name}</h3>
                            <p>📧 {user.mail}</p>
                            <p>🌐{user.website}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default UserDirectory;

