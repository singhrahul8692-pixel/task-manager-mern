import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Task from "./models/Task.js";
import taskRoutes from "./routes/taskRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

// request logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`, req.body);
  next();
});

// root route shows current tasks
app.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    const listItems = tasks
      .map((task) => `<li>${task.title} (${task._id})</li>`)
      .join("");
    res.send(`
      <h1>Task Manager API</h1>
      <p>Tasks saved in MongoDB:</p>
      <ul>${listItems}</ul>
    `);
  } catch (err) {
    console.error("Error fetching tasks:", err.message);
    res.status(500).send("Error loading tasks");
  }
});

// routes
app.use("/api", taskRoutes);

mongoose
  .connect("mongodb://127.0.0.1:27017/taskdb")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});