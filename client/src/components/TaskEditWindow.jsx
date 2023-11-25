import { useContext, useState } from "react";
import { TodoContext } from "../MyContext";

const TaskEditWindow = ({ task }) => {
  console.log(task);
  const { tasks, createTask, isEdit, setEdit } = useContext(TodoContext);
  const { newTask, setNewTask } = useState(task.task_desc);
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const desc = formData.get("task_desc");
    if (desc === null || desc.length === 0) alert("Description not found");
    console.log(desc);
  };

  return isEdit ? (
    <div className="fixed z-[1] top-0 left-0 pt-1 w-[100%] h-[100%] bg-gray-300 opacity-100">
      <div className="relative container m-auto mt-20 bg-gray-200 p-20 rounded-2xl">
        <h2 className="text-6xl mb-20">ToDo App</h2>
        <button
          onClick={() => setEdit(!isEdit)}
          className="absolute top-5 right-10 hover:text-gray-800 hover:cursor-pointer  text-6xl text-gray-400 mb-20"
        >
          &times;
        </button>
        <form action="POST" onSubmit={onSubmit} className="flex justify-around">
          <label htmlFor="task_desc" className="text-2xl my-auto">
            Task Description
          </label>
          <input
            type="text"
            className="rounded w-full mx-5 p-4"
            name="task_desc"
            id="task_desc_id"
            value={task.task_desc}
            onChange={(e) => {
              setNewTask(e.target.value);
            }}
          />
          <button
            type="submit"
            className="text-xl bg-blue-500 px-10 rounded-md text-white hover:bg-blue-600 hover:ring-2"
          >
            Update Task
          </button>
        </form>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default TaskEditWindow;
