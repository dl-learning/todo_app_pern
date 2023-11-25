import React, { useContext } from "react";
import { TodoContext } from "../MyContext";

const TaskInputField = () => {
  const { setTask, tasks, settaskChanged, taskChanged } =
    useContext(TodoContext);
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);
      const task_desc = formData.get("task_desc");
      e.currentTarget.reset();
      if (task_desc === null || task_desc === "") {
        return;
      }
      await fetch("https://todo-api-4sx2.onrender.com/todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          todo_task: task_desc,
        }),
      });
      settaskChanged(!taskChanged);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="container bg-gray-100 p-20 rounded-2xl max-md:px-5">
      <h2 className="text-6xl mb-20">ToDo App</h2>
      <form
        action="POST"
        onSubmit={onSubmit}
        className="flex justify-around max-md:grid gap-4 max-md:justify-normal max-md:auto-rows-max"
      >
        <label
          htmlFor="task_desc"
          className="text-2xl my-auto max-md:text-start"
        >
          Task Description
        </label>
        <input
          type="text"
          className="rounded w-full  p-4"
          name="task_desc"
          id="task_desc_id"
        />
        <button
          type="submit"
          className="text-xl bg-blue-500 px-10 rounded-md text-white hover:bg-blue-600 hover:ring-2 max-md:h-10 max-md:mt-3"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default TaskInputField;
