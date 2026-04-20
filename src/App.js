import { useState } from "react";
import api from "./api";

function App() {
  const [title, setTitle] = useState("");

  // Add Task function
  const addTask = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/api/tasks", {
        title: title,
      });

      console.log("Saved:", res.data);
      setTitle("");
    } catch (error) {
      console.log("Error:", error.message);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Task Manager</h1>

      {/* Add Task Form */}
      <form onSubmit={addTask}>
        <input
          type="text"
          placeholder="Enter task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ padding: "8px", marginRight: "10px" }}
        />

        <button type="submit" style={{ padding: "8px" }}>
          Add Task
        </button>
      </form>
    </div>
  );
}

export default App;