import {useEffect, useState} from 'react';
import io from 'socket.io-client';
import TasksSectionList from './components/TasksSectionList/TasksSectionList';
import AddTaskForm from './components/AddTaskForm/AddTaskForm';

const App = () => {
  const [socket, setSocket] = useState(null);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const newSocket = io('http://localhost:8000');
    setSocket(newSocket);

    newSocket.on('addTask', (task) => {
      setTasks((tasks) => [...tasks, task]);
    });

    newSocket.on('removeTask', (taskId) => {
      setTasks((tasks) => tasks.filter((task) => task.id !== taskId));
    });
  }, []);

  const removeTask = (taskId) => {
    setTasks((tasks) => tasks.filter((task) => task.id !== taskId));
    socket.emit('removeTask', taskId);
  };

  const addTask = (task) => {
    setTasks((tasks) => [...tasks, task]);
    socket.emit('addTask', task);
  };

  return (
    <div className="App">
      <header>
        <h1>ToDoList.app</h1>
      </header>

      <section className="tasks-section" id="tasks-section">
        <h2>Tasks</h2>
        <TasksSectionList tasks={tasks} removeTask={removeTask} />
        <AddTaskForm socket={socket} addTask={addTask} />
      </section>
    </div>
  );
};

export default App;