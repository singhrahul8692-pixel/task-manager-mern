import express from "express";
import Task from "../models/Task.js";

const router = express.Router();

/* CREATE TASK */
router.post("/tasks", async (req, res) => {
  try {
    console.log("Creating task:", req.body);
    const task = await Task.create(req.body);
    console.log("Task created:", task);
    res.json(task);
  } catch (err) {
    console.error("Task creation error:", err.message);
    res.status(500).json({ message: err.message });
  }
});

/* GET ALL TASKS */
router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* DELETE TASK */
router.delete("/tasks/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;