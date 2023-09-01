const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// Middleware for parsing JSON
app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const { Sequelize } = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "database.sqlite",
});

const Task = require("./models/task");

// Create a new task
app.post("/tasks", async (req, res) => {
  try {
    const task = await Task.create(req.body);
    return res.json(task);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Read all tasks
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.findAll();
    return res.json(tasks);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Update a task by ID
app.put("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findByPk(id);
    if (!task) return res.status(404).json({ error: "Task not found" });

    await task.update(req.body);
    return res.json(task);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Delete a task by ID
app.delete("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findByPk(id);
    if (!task) return res.status(404).json({ error: "Task not found" });

    await task.destroy();
    return res.json({ message: "Task deleted" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
