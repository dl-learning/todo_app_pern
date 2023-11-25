const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const pool = require("./db");

const PORT = process.env.PORT || 8080;

// middleware
app.use(cors());
app.use(express.json());

app.post("/todo", async (req, res) => {
  try {
    const { todo_task } = req.body;
    console.log(todo_task);
    const newTodo = await pool.query(
      "INSERT INTO todo_table (task_desc) VALUES ($1) RETURNING *",
      [todo_task]
    );
    console.log(newTodo.rows[0]);
    res.json(newTodo.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/todo", async (req, res) => {
  try {
    const todo = await pool.query("SELECT * FROM todo_table ORDER BY id");
    res.json(todo.rows);
  } catch (error) {
    console.log(error.message);
  }
});

app.put("/todo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { todo_task, is_complete } = req.body;

    // console.log(is_complete);

    if (todo_task) {
      await pool.query("UPDATE todo_table SET task_desc = $1 WHERE id = $2", [
        todo_task,
        id,
      ]);
      res.json("task desc updated");
    }
    if (is_complete != null) {
      await pool.query("UPDATE todo_table SET is_complete = $1 WHERE id = $2", [
        is_complete,
        id,
      ]);
      return res.json("task status updated");
    }
  } catch (error) {
    console.log(error.message);
  }
});

app.delete("/todo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM todo_table WHERE id = $1", [id]);
    res.json("task was deleted successfully");
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/", async (req, res) => {
  try {
    res.json({ message: "this is a get response for homepage" });
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(PORT, (req, res) => {
  console.log(`server listening on port ${PORT}`);
});
