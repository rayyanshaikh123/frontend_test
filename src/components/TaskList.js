import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await axios.get('https://api.bitmasters52.online/tasks');
      setTasks(res.data);
    };
    fetchTasks();
  }, []);

  const addTask = async () => {
    const res = await axios.post('https://api.bitmasters52.online/tasks', { title });
    setTasks([...tasks, res.data]);
    setTitle('');
  };

  const deleteTask = async (id) => {
    await axios.delete(`https://api.bitmasters52.online/tasks/${id}`);
    setTasks(tasks.filter((task) => task._id !== id));
  };

  return (
    <div>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.title}
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
