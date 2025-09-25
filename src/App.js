import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [userId] = useState("");
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

 useEffect(() => {
  axios.get(`${process.env.REACT_APP_API_URL}/tasks/${userId}`).then(res => {
    setTasks(res.data);
  });
}, [userId]);

const addTask = async () => {
  const res = await axios.post(`${process.env.REACT_APP_API_URL}/tasks`, {
    userId,
    text: task,
  });
  setTasks([...tasks, res.data]);
  setTask("");
};


  return (
    <div>
      <h1>MERN To-Do App</h1>
      <input
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter task"
      />
      <button onClick={addTask}>Add</button>
      <ul>
        {tasks.map((t) => (
          <li key={t._id}>{t.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
