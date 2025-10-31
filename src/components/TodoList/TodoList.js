import React, { useState, useEffect } from 'react';
import './TodoList.css';
import TodoItem from '../TodoItem/TodoItem';
import { db } from '../../FirebaseConfig'; // <-- Importa nuestra config
import { collection, query, orderBy, onSnapshot, addDoc, doc, updateDoc, deleteDoc, serverTimestamp, getDoc, where, getDocs, Timestamp } from "firebase/firestore"; // <-- Importa funciones de Firestore

const TodoList = () => {
    // Hook useState para guardar la lista de tareas
    const [tasks, setTasks] = useState([]);
    const [completedHistory, setCompletedHistory] = useState([]);
    const [deletedHistory, setDeletedHistory] = useState([]);

    // Hook para el campo de texto del formulario
    const [inputValue, setInputValue] = useState('');

    // useEffect se ejecutará cuando el componente se monte
    useEffect(() => {
      // 1. Creamos una referencia a nuestra colección "tasks" en Firestore
      const collectionRef = collection(db, "tasks");

      // 2. Creamos una consulta (query) para ordenar las tareas por fecha
      const q = query(collectionRef, orderBy("createdAt", "asc"));

      // 3. onSnapshot es el ¡ESCUCHADOR EN TIEMPO REAL!
      // Se dispara una vez al inicio y luego CADA VEZ que los datos cambian
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const newTasks = [];
        querySnapshot.forEach((doc) => {
          newTasks.push({ 
            ...doc.data(), 
            id: doc.id // El ID del documento es importante
          });
        });
        setTasks(newTasks); // Actualizamos nuestro estado de React
      });

      // Esta función de limpieza se ejecuta cuando el componente se "desmonta"
      // Evita fugas de memoria
      return () => unsubscribe();

    }, []); // El '[]' asegura que esto se ejecute solo una vez

    // Historial de tareas completadas
    useEffect(() => {
      const collectionRef = collection(db, "completedHistory");

      const q = query(collectionRef, orderBy("completedAt", "asc"));

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const history = [];
        querySnapshot.forEach((doc) => {
          history.push({
            ...doc.data(),
            id: doc.id
          });
        });
        setCompletedHistory(history);
      });

      return () => unsubscribe();
    }, []);

    // Historial de tareas eliminadas
    useEffect(() => {
      const collectionRef = collection(db, "deletedHistory");

      const q = query(collectionRef, orderBy("deletedAt", "asc"));

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const history = [];
        querySnapshot.forEach((doc) => {
          history.push({
            ...doc.data(),
            id: doc.id
          });
        });
        setDeletedHistory(history);
      });

      return () => unsubscribe();
    }, []);

    //Función para manejar el envío del formulario
    const handleAddTask = async (e) => { // La hacemos 'async'
      e.preventDefault();
      if (inputValue.trim() === '') return;
    
      // ¡En lugar de solo 'setTasks', escribimos en la BD!
      await addDoc(collection(db, "tasks"), {
        text: inputValue,
        isComplete: false,
        createdAt: serverTimestamp() // Marca de tiempo de Firebase
      });
    
      setInputValue('');
      // NOTA: No necesitamos 'setTasks' aquí.
      // ¡'onSnapshot' detectará el nuevo documento y actualizará el estado por nosotros!
    };
    

    // Función para marcar/desmarcar una tarea
    const handleToggleComplete = async (task) => { // Pasamos el objeto 'task' entero
      // Creamos una referencia al documento específico por su ID
      const taskRef = doc(db, "tasks", task.id);

      if (!task.isComplete) {
        // Se agrega a la coleccion de tareas completadas
        await addDoc(collection(db, "completedHistory"), {
          taskId: task.id,
          text: task.text,
          completedAt: serverTimestamp()
        });

        // Actualizamos el estado de la tarea
        await updateDoc(taskRef, {
          isComplete: true // Invertimos el valor
        });
      } else {
        // Si se desmarca, se elimina del historial
        // Se busca la tarea en el historial de tareas completadas
        const historyQuery = query(
          collection(db, "completedHistory"),
          where("taskId", "==", task.id)
        );

        const historySnapshot = await getDocs(historyQuery);

        // Se elimina el registro de la tarea
        historySnapshot.forEach(async (historyDoc) => {
          await deleteDoc(doc(db, "completedHistory", historyDoc.id));
        });

        await updateDoc(taskRef, {
          isComplete: false
        });
      }
    
      
      // De nuevo, ¡onSnapshot se encarga de actualizar la UI!
    };

    // Función para eliminar una tarea
    const handleDeleteTask = async (idToDelete) => {
      // Creamos una referencia al documento
      const taskRef = doc(db, "tasks", idToDelete);

      // Se obtienen los datos de la tarea antes de eliminarla
      const taskSnapshot = await getDoc(taskRef);

      if (taskSnapshot.exists()) {
        const taskData = taskSnapshot.data();

        // Se guarda en el historial de eliminaciones
        await addDoc(collection(db, "deletedHistory"), {
          taskId: idToDelete,
          text: taskData.text,
          isComplete: taskData.isComplete,
          deletedAt: serverTimestamp()
        });
      }

    
      // Borramos la tarea
      await deleteDoc(taskRef);
      // ¡onSnapshot se encarga del resto!
    };

    // Funcion para mostrar las fechas en formato legible
    const formatDate = (timestamp) => {
      if (!timestamp) return 'Fecha no disponible';
      
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      
      return date.toLocaleString('es-MX', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    };

    return (
      <div>
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
                // ¡Pasa la función correctamente!
                onToggleComplete={() => handleToggleComplete(task)} // Pasa el objeto 'task'
                onDeleteTask={handleDeleteTask} // Esta ya pasaba solo el ID
              />
            ))}
          </ul>
        </div>

        <h1>Historiales</h1>

        <div className="list-completed-history">
            <h2>Historial de Tareas Completadas</h2>

            {completedHistory.length === 0 ? (
              <p>No hay tareas competadas</p>
            ) : (
              <ul>
                {completedHistory.map(compHistory => (
                  <li key={compHistory.id} className="items-history">
                    <strong>{compHistory.text}</strong>
                    <br/>
                    <small>Completada: {formatDate(compHistory.completedAt)}</small>
                  </li>
                ))}
              </ul>
            )}
        </div>

        <div className="list-deleted-history">
            <h2>Historial de Tareas Eliminadas</h2>

            {deletedHistory.length === 0 ? (
              <p>No hay tareas eliminadas</p>
            ) : (
              <ul>
                {deletedHistory.map(delHistory => (
                  <li key={delHistory.id} className="items-history">
                    <strong>{delHistory.text}</strong>
                    <br/>
                    <small>
                      Eliminada: {formatDate(delHistory.deletedAt)}
                    </small>
                  </li>
                ))}
              </ul>
            )}
        </div>
      </div>
    );
};

export default TodoList;