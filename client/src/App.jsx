import TaskInputField from "./components/TaskInputField";
import TaskList from "./components/TaskList";
import TaskEditWindow from "./components/TaskEditWindow";
import { useEffect, useState } from "react";

import { TodoContext } from "./MyContext";
import "./App.css";

function App() {
  const [tasks, setTask] = useState([]);
  const [taskChanged, settaskChanged] = useState(false);

  useEffect(() => {
    const getTaskList = async () => {
      try {
        const res = await fetch("https://todo-api-4sx2.onrender.com/todo");
        const data = await res.json();
        setTask(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getTaskList();
  }, [taskChanged]);

  return (
    <TodoContext.Provider
      value={{ tasks, setTask, settaskChanged, taskChanged }}
    >
      <main className="grid justify-normal ">
        <TaskInputField />
        <TaskList />
      </main>
    </TodoContext.Provider>
  );
}

export default App;
