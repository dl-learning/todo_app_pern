import { TodoContext } from "../MyContext";
import { useContext, useState, useEffect } from "react";

const TaskList = () => {
  const { tasks, setTask } = useContext(TodoContext);

  return (
    <section className="container bg-gray-100 p-20 rounded-2xl mt-10">
      <h2 className="text-4xl mb-10">Task List</h2>
      {tasks ? (
        <div>
          {tasks.map((task) => {
            return <TaskItem key={task.id} task={task} />;
          })}
        </div>
      ) : (
        <h2>No Tasks yet.</h2>
      )}
    </section>
  );
};

const TaskItem = (props) => {
  const { task } = props;
  console.log(task);
  const [updatedTask, setUpdatedTask] = useState(task.task_desc);
  const [isEdit, setEdit] = useState(false);
  const [isComplete, setComplete] = useState(task.is_complete);
  const { tasks, setTask, settaskChanged, taskChanged } =
    useContext(TodoContext);

  const editTask = async (e) => {
    e.preventDefault();
    const id = task.id;

    const res = await fetch(`https://todo-api-4sx2.onrender.com/todo/${id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        todo_task: updatedTask,
      }),
    });
    settaskChanged(!taskChanged);
    setEdit(!isEdit);
  };

  const deleteTask = async (id) => {
    const res = await fetch(`https://todo-api-4sx2.onrender.com/todo/${id}`, {
      method: "delete",
    });
    settaskChanged(!taskChanged);
  };

  const markCompleted = async (id) => {
    try {
      console.log(
        `current value is ${isComplete} setting to ${!isComplete} for ${id}`
      );
      const res = await fetch(`https://todo-api-4sx2.onrender.com/todo/${id}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          is_complete: !isComplete,
        }),
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <div
        className={
          "flex justify-between my-4 max-md:grid bg-white p-4 max-md:py-2 max-md:justify-normal rounded-xl" +
          (isComplete ? " ring-2 ring-green-400" : "")
        }
      >
        <div className="w-full flex justify-start max-md:justify-center">
          <input
            type="checkbox"
            className="accent-emerald-500/25 w-5 h-5 my-auto"
            checked={isComplete}
            onChange={() => {
              markCompleted(task.id);
              setComplete(!isComplete);
            }}
          />
          <h2 className="text-xl my-auto px-4 max-md:my-4">{task.task_desc}</h2>
          {isEdit && (
            <div className="fixed w-full h-full top-0 left-0 p-10 max-md:px-5 bg-gray-500 bg-opacity-75">
              <div className="relative w-full container bg-gray-100 p-20 max-md:px-5 rounded-2xl m-auto">
                <button
                  onClick={() => setEdit(!isEdit)}
                  htmlFor="task_desc"
                  className="absolute text-5xl text-gray-400 hover:text-gray-500 top-0 right-0 p-10 my-auto"
                >
                  &times;
                </button>
                <h2 className="text-6xl  mb-20">Update Task </h2>
                <form
                  onKeyDown={(e) => {
                    if (e.key === "Escape") {
                      console.log("Escape pressed");
                    }
                  }}
                  className="flex justify-around max-md:grid gap-4 max-md:justify-normal"
                  onSubmit={editTask}
                >
                  <label
                    htmlFor="task_desc"
                    className="text-2xl my-auto text-start px-2"
                  >
                    Task Description
                  </label>
                  <input
                    type="text"
                    className="rounded w-full p-4 text-xl"
                    name="task_desc"
                    id="task_desc_id"
                    value={updatedTask}
                    onChange={(e) => setUpdatedTask(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="text-xl bg-blue-500 px-10 rounded-md text-white  hover:bg-blue-600 hover:ring-2  max-md:h-14 max-md:mt-3"
                  >
                    Update Task
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
        <div className="ms-5 flex justify-center  gap-4">
          <button
            className="bg-blue-500 rounded-lg text-white text-lg p-2 w-20"
            type="button"
            onClick={() => setEdit(!isEdit)}
          >
            Edit
          </button>

          <button
            className="bg-red-500 rounded-lg text-white text-lg p-2 w-20"
            type="button"
            onClick={() => deleteTask(task.id)}
          >
            Delete
          </button>
        </div>
      </div>
      {/* <TaskEditWindow task={task} /> */}
    </div>
  );
};

export default TaskList;
