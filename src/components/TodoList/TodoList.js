import React, { useState} from 'react';
import './TodoList.css';
import TodoItem from '../TodoItem/TodoItem';

const TodoList = () => {
    // Hook useState para guardar la lista de tareas
    const [tasks, setTasks] = useState([
        { id: 1, text: 'Aprende React', isComplete: false},
        { id: 2, text: 'Construir una App', isComplete: false},
        { id: 3, text: 'Modularizar componentes', isComplete: false}
    ]);

    // Hook para el campo de texto del formulario
    const [inputValue, setInputValue] = useState('');

    //Función para manejar el envío del formulario
    const handleAddTask = (e) => {

        // Evita que la página se recargue
        e.preventDefault();

        // Evita que se añadan tareas vacías
        if (inputValue.trim() === '') return;
        
        const newTask = {
            // Asignamos un id único basado en la fecha actual
            id: Date.now(),
            // Asiganamos el valor del input a la nueva tarea
            text: inputValue,
            isComplete: false
        };

        // Añadimos la nueva tarea a la lista
        setTasks([...tasks, newTask]);

        // Limpiamos el campo de texto
        setInputValue('');

    };
    

    // Función para marcar/desmarcar una tarea
    const handleToggleComplete = (idToToggle) => {
        setTasks(
        tasks.map(task => 
            task.id === idToToggle 
            ? { ...task, isComplete: !task.isComplete } // Crea un nuevo objeto
            : task // Devuelve el objeto original
        )
        );
    };

    // Función para eliminar una tarea
    const handleDeleteTask = (idToDelete) => {
        setTasks(
        tasks.filter(task => task.id !== idToDelete)
        );
    };

    return (
        <div className="todo-list-container">
      <h2>Mi Lista de Tareas</h2>

      <form onSubmit={handleAddTask} className="add-task-form">
        <input 
          type="text" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Añade una nueva tarea..."
        />
        <button type="submit">Añadir</button>
      </form>

      <ul>
        {/* Aquí está la magia: 
          Mapeamos las tareas y por cada una, renderizamos un <TodoItem />
          pasándole los datos y las FUNCIONES como props.
        */}
        {tasks.map(task => (
          <TodoItem 
            key={task.id}
            task={task}
            onToggleComplete={handleToggleComplete}
            onDeleteTask={handleDeleteTask}
          />
        ))}
      </ul>
    </div>
    );
};

export default TodoList;