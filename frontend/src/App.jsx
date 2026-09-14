import { useEffect, useState } from "react";

import Login from "./components/Login";

import Register from "./components/Register";

import Header from "./components/Header";
import TaskCard from "./components/TaskCard";
import Sidebar from "./components/Sidebar";
import StatsCards from "./components/StatsCards";
import Toast from "./components/Toast";
import KanbanBoard from "./components/KanbanBoard";
import AnalyticsCharts
from "./components/AnalyticsCharts";

import {
  fetchTasksApi,
  createTaskApi,
  deleteTaskApi,
  updateTaskApi
} from "./services/taskService";

function App() {

  const [isAuthenticated, setIsAuthenticated] =
    useState(() => {
      return !!localStorage.getItem("token");
    });

    const [showRegister, setShowRegister] = useState(false);

    const handleLogout = () => {
  localStorage.removeItem("token");
  setIsAuthenticated(false);
};

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [darkMode, setDarkMode] =
  useState(() => {

    const savedTheme =
      localStorage.getItem("darkMode");

    return savedTheme === "true";
  });

  const [toast, setToast] = useState({
    message: "",
    type: "success"
  });

  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] =
    useState("ALL");

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "MEDIUM",
    status: "TODO",
    dueDate: ""
  });

  useEffect(() => {

  if (!isAuthenticated) {
    setLoading(false);
    return;
  }

  fetchTasks();

}, [isAuthenticated]);

  useEffect(() => {

  localStorage.setItem(
    "darkMode",
    darkMode
  );

}, [darkMode]);

  useEffect(() => {

    if (toast.message) {

      const timer = setTimeout(() => {

        setToast({
          message: "",
          type: "success"
        });

      }, 2500);

      return () => clearTimeout(timer);
    }

  }, [toast]);

  useEffect(() => {

  localStorage.setItem(
    "tasks",
    JSON.stringify(tasks)
  );

}, [tasks]);

  const filteredTasks = tasks.filter((task) => {

    const matchesSearch =
      task.title
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesPriority =
      priorityFilter === "ALL"
        ? true
        : task.priority === priorityFilter;

    return matchesSearch && matchesPriority;
  });

  const fetchTasks = async () => {

    try {

      setLoading(true);

      const data = await fetchTasksApi();

      setTasks(data);

    } catch (error) {

      console.error(error);

      setToast({
        message: "Failed to load tasks",
        type: "error"
      });

    } finally {

      setLoading(false);
    }
  };

  const handleChange = (event) => {

    const { name, value } = event.target;

    setNewTask({
      ...newTask,
      [name]: value
    });
  };

  const createTask = async () => {

    if (!newTask.title.trim()) {

      setToast({
        message: "Task title is required",
        type: "error"
      });

      return;
    }

    try {

      const response =
        await createTaskApi(newTask);

      if (response.ok) {

        setNewTask({
          title: "",
          description: "",
          priority: "MEDIUM",
          status: "TODO",
          dueDate: ""
        });

        fetchTasks();

        setToast({
          message: "Task created successfully",
          type: "success"
        });
      }

    } catch (error) {

      console.error(error);

      setToast({
        message: "Failed to create task",
        type: "error"
      });
    }
  };

  const deleteTask = async (id) => {

    try {

      const response =
        await deleteTaskApi(id);

      if (response.ok) {

        fetchTasks();

        setToast({
          message: "Task deleted",
          type: "success"
        });
      }

    } catch (error) {

      console.error(error);

      setToast({
        message: "Failed to delete task",
        type: "error"
      });
    }
  };

  const updateTaskStatus = async (
    task,
    newStatus
  ) => {

    try {

      const response =
        await updateTaskApi(task, newStatus);

      if (response.ok) {

        fetchTasks();

        setToast({
          message: "Task updated",
          type: "success"
        });
      }

    } catch (error) {

      console.error(error);

      setToast({
        message: "Failed to update task",
        type: "error"
      });
    }
  };

    if (!isAuthenticated) {

  if (showRegister) {
    return (
      <Register
        onRegister={() =>
          setShowRegister(false)
        }
      />
    );
  }

  return (
    <Login
      onLogin={() =>
        setIsAuthenticated(true)
      }
      onRegister={() =>
        setShowRegister(true)
      }
    />
  );
}

  return (

    <div
      className="app-layout"
      style={{
  ...styles.page,
  backgroundColor: darkMode
    ? "#0f172a"
    : "#f5f7fb"
}}
    >

      <Sidebar
  darkMode={darkMode}
  onLogout={handleLogout}
/>
      <Toast
  message={toast.message}
  type={toast.type}
  darkMode={darkMode}
/>

      <main
        className="main-content"
        style={styles.main}
      >

        <div style={styles.dashboardHeader}>

          <div>

            <h1
  style={{
    ...styles.heading,
    color: darkMode
      ? "#ffffff"
      : "#111827"
  }}
>
              Dashboard
            </h1>

            <p
  style={{
    ...styles.subheading,
    color: darkMode
      ? "#94a3b8"
      : "#6b7280"
  }}
>
              Manage tasks and daily productivity
            </p>

          </div>

          <div style={styles.topActions}>

  <div style={styles.quickStats}>

    <div
      style={{
        ...styles.quickCard,
        backgroundColor: darkMode
          ? "#1e293b"
          : "#ffffff",
        border: darkMode
          ? "1px solid #334155"
          : "1px solid #e5e7eb"
      }}
    >

      <span
        style={{
          ...styles.quickLabel,
          color: darkMode
            ? "#94a3b8"
            : "#6b7280"
        }}
      >
        Total Tasks
      </span>

      <span
        style={{
          ...styles.quickValue,
          color: darkMode
            ? "#ffffff"
            : "#111827"
        }}
      >
        {tasks.length}
      </span>

    </div>

    <div
      style={{
        ...styles.quickCard,
        backgroundColor: darkMode
          ? "#1e293b"
          : "#ffffff",
        border: darkMode
          ? "1px solid #334155"
          : "1px solid #e5e7eb"
      }}
    >

      <span
        style={{
          ...styles.quickLabel,
          color: darkMode
            ? "#94a3b8"
            : "#6b7280"
        }}
      >
        Completed
      </span>

      <span
        style={{
          ...styles.quickValue,
          color: darkMode
            ? "#ffffff"
            : "#111827"
        }}
      >
        {
          tasks.filter(
            (task) =>
              task.status ===
              "COMPLETED"
          ).length
        }
      </span>

    </div>

  </div>

  <button
    onClick={() =>
      setDarkMode(!darkMode)
    }
    style={{
      ...styles.darkModeButton,
      backgroundColor: darkMode
        ? "#111827"
        : "#ffffff",
      color: darkMode
        ? "#ffffff"
        : "#111827",
      border: darkMode
        ? "1px solid #374151"
        : "1px solid #d1d5db"
    }}
  >

    {darkMode
      ? "☀ Light"
      : "🌙 Dark"}

  </button>

</div>

        </div>

        <StatsCards
  tasks={tasks}
  darkMode={darkMode}
/>

        <div style={styles.contentGrid}>

          <section
  style={{
    ...styles.formSection,
    backgroundColor: darkMode
      ? "#1e293b"
      : "#ffffff"
  }}
>

            <div style={styles.sectionHeader}>

              <h2
  style={{
    ...styles.sectionTitle,
    color: darkMode
      ? "#ffffff"
      : "#111827"
  }}
>
                Create Task
              </h2>

              <p style={styles.sectionText}>
                Add and organize your workflow
              </p>

            </div>

            <div style={styles.form}>

              <input
                type="text"
                name="title"
                placeholder="Task title"
                value={newTask.title}
                onChange={handleChange}
                style={{
  ...styles.input,
  backgroundColor: darkMode
    ? "#0f172a"
    : "#ffffff",
  border: darkMode
    ? "1px solid #334155"
    : "1px solid #d1d5db",
  color: darkMode
    ? "#ffffff"
    : "#111827"
}}
              />

              <textarea
                name="description"
                placeholder="Task description"
                value={newTask.description}
                onChange={handleChange}
                style={{
  ...styles.textarea,
  backgroundColor: darkMode
    ? "#0f172a"
    : "#ffffff",
  border: darkMode
    ? "1px solid #334155"
    : "1px solid #d1d5db",
  color: darkMode
    ? "#ffffff"
    : "#111827"
}}
              />

              <input
                type="date"
                name="dueDate"
                value={newTask.dueDate}
                onChange={handleChange}
                style={{
  ...styles.input,
  backgroundColor: darkMode
    ? "#0f172a"
    : "#ffffff",
  border: darkMode
    ? "1px solid #334155"
    : "1px solid #d1d5db",
  color: darkMode
    ? "#ffffff"
    : "#111827"
}}
              />

              <select
                name="priority"
                value={newTask.priority}
                onChange={handleChange}
                style={{
  ...styles.select,
  backgroundColor: darkMode
    ? "#0f172a"
    : "#ffffff",
  border: darkMode
    ? "1px solid #334155"
    : "1px solid #d1d5db",
  color: darkMode
    ? "#ffffff"
    : "#111827"
}}
              >

                <option value="LOW">
                  LOW
                </option>

                <option value="MEDIUM">
                  MEDIUM
                </option>

                <option value="HIGH">
                  HIGH
                </option>

              </select>

              <select
  name="status"
  value={newTask.status}
  onChange={handleChange}
  style={{
    ...styles.select,
    backgroundColor: darkMode
      ? "#0f172a"
      : "#ffffff",
    border: darkMode
      ? "1px solid #334155"
      : "1px solid #d1d5db",
    color: darkMode
      ? "#ffffff"
      : "#111827"
  }}
>

  <option value="TODO">
    TODO
  </option>

  <option value="IN_PROGRESS">
    IN PROGRESS
  </option>

  <option value="REVIEW">
    REVIEW
  </option>

  <option value="BLOCKED">
    BLOCKED
  </option>

  <option value="COMPLETED">
    COMPLETED
  </option>

</select>

              <button
  onClick={createTask}
  style={styles.button}
  onMouseEnter={(e) => {

    e.currentTarget.style.transform =
      "translateY(-2px)";

    e.currentTarget.style.boxShadow =
      "0 10px 20px rgba(124,58,237,0.35)";
  }}
  onMouseLeave={(e) => {

    e.currentTarget.style.transform =
      "translateY(0px)";

    e.currentTarget.style.boxShadow =
      "none";
  }}
>
                Create Task
              </button>

            </div>

          </section>

          <section style={styles.taskSection}>

            <div
              className="tasks-header"
              style={styles.tasksHeader}
            >

              <h2
  style={{
    ...styles.sectionTitle,
    color: darkMode
      ? "#ffffff"
      : "#111827"
  }}
>
                Tasks
              </h2>

              <div style={styles.actions}>

                <input
                  className="search-input"
                  type="text"
                  placeholder="Search tasks..."
                  value={search}
                  onChange={(event) =>
                    setSearch(
                      event.target.value
                    )
                  }
                  style={{
  ...styles.searchInput,
  backgroundColor: darkMode
    ? "#0f172a"
    : "#ffffff",
  border: darkMode
    ? "1px solid #334155"
    : "1px solid #d1d5db",
  color: darkMode
    ? "#ffffff"
    : "#111827"
}}
                />

                <select
                  value={priorityFilter}
                  onChange={(event) =>
                    setPriorityFilter(
                      event.target.value
                    )
                  }
                  style={{
  ...styles.select,
  backgroundColor: darkMode
    ? "#0f172a"
    : "#ffffff",
  border: darkMode
    ? "1px solid #334155"
    : "1px solid #d1d5db",
  color: darkMode
    ? "#ffffff"
    : "#111827"
}}
                >

                  <option value="ALL">
                    All Priorities
                  </option>

                  <option value="HIGH">
                    High Priority
                  </option>

                  <option value="MEDIUM">
                    Medium Priority
                  </option>

                  <option value="LOW">
                    Low Priority
                  </option>

                </select>

              </div>

            </div>

            {loading && (
              <div style={styles.loading}>
                Loading tasks...
              </div>
            )}

            {!loading && (

              <div
                className="task-grid"
                style={styles.taskGrid}
              >

                {filteredTasks.length === 0 ? (

                  <div
  style={{
    ...styles.emptyState,
    backgroundColor: darkMode
      ? "#1e293b"
      : "#ffffff"
  }}
>

                    <h3
  style={{
    marginBottom: "10px",
    color: darkMode
      ? "#ffffff"
      : "#111827"
  }}
>
                      No tasks found
                    </h3>

                    <p
                      style={{
                        color: "#9ca3af"
                      }}
                    >
                      Create your first task to
                      get started.
                    </p>

                  </div>

                ) : (

                  filteredTasks.map((task) => (
                    <TaskCard
  key={task.id}
  task={task}
  deleteTask={deleteTask}
  updateTaskStatus={updateTaskStatus}
  darkMode={darkMode}
/>
                  ))

                )}

              </div>
            )}

          </section>

          <KanbanBoard
  tasks={tasks}
  darkMode={darkMode}
  updateTaskStatus={updateTaskStatus}
/>

<AnalyticsCharts
  tasks={tasks}
  darkMode={darkMode}
/>

        </div>

      </main>

    </div>
  );
}

const styles = {

  page: {
  display: "flex",
  backgroundColor: "#f5f7fb",
  minHeight: "100vh",
  width: "100%"
},

  main: {
    flex: 1,
    padding: "24px 28px",
    overflowX: "hidden"
  },

  dashboardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
    flexWrap: "wrap",
    gap: "20px"
  },

  heading: {
    fontSize: "36px",
    fontWeight: "700",
    color: "#111827",
    marginBottom: "4px"
  },

  subheading: {
    color: "#6b7280",
    fontSize: "15px"
  },

  quickStats: {
    display: "flex",
    gap: "14px",
    flexWrap: "wrap"
  },

  quickCard: {
  borderRadius: "14px",
  padding: "14px 18px",
  minWidth: "140px",
  boxShadow:
    "0 2px 6px rgba(0,0,0,0.03)"
},

  quickLabel: {
    fontSize: "13px",
    color: "#6b7280",
    display: "block",
    marginBottom: "6px"
  },

  quickValue: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#111827"
  },

  contentGrid: {
    display: "flex",
    flexDirection: "column",
    gap: "28px"
  },

  formSection: {
    backgroundColor: "#ffffff",
    padding: "24px",
    borderRadius: "18px",
    border: "1px solid #e5e7eb",
    boxShadow:
      "0 2px 8px rgba(0,0,0,0.03)"
  },

  sectionHeader: {
    marginBottom: "18px"
  },

  sectionTitle: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#111827",
    marginBottom: "4px"
  },

  sectionText: {
    fontSize: "14px",
    color: "#6b7280"
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "14px"
  },

  input: {
    padding: "14px 16px",
    borderRadius: "12px",
    border: "1px solid #d1d5db",
    fontSize: "14px",
    outline: "none"
  },

  textarea: {
    padding: "14px 16px",
    borderRadius: "12px",
    border: "1px solid #d1d5db",
    minHeight: "90px",
    resize: "vertical",
    fontSize: "14px",
    outline: "none"
  },

  select: {
  padding: "14px 16px",
  borderRadius: "12px",
  border: "1px solid #d1d5db",
  fontSize: "14px",
  backgroundColor: "#ffffff",
  outline: "none",
  appearance: "none",
  WebkitAppearance: "none",
  MozAppearance: "none"
},

  button: {
    background:
      "linear-gradient(135deg, #6d28d9, #7c3aed)",
    color: "#ffffff",
    border: "none",
    padding: "14px",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "15px"
  },

  taskSection: {
    marginTop: "4px"
  },

  tasksHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    gap: "20px",
    flexWrap: "wrap"
  },

  actions: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap"
  },

  searchInput: {
    padding: "12px 16px",
    borderRadius: "12px",
    border: "1px solid #d1d5db",
    minWidth: "240px",
    fontSize: "14px"
  },

  filterSelect: {
    padding: "12px 14px",
    borderRadius: "12px",
    border: "1px solid #d1d5db",
    backgroundColor: "#ffffff",
    fontSize: "14px"
  },

  loading: {
    backgroundColor: "#ffffff",
    padding: "28px",
    borderRadius: "14px",
    textAlign: "center",
    border: "1px solid #e5e7eb",
    color: "#6b7280"
  },

  taskGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "22px"
  },

  emptyState: {
    backgroundColor: "#ffffff",
    border: "2px dashed #d1d5db",
    borderRadius: "16px",
    padding: "70px 20px",
    textAlign: "center",
    color: "#6b7280"
  },

  topActions: {
  display: "flex",
  alignItems: "center",
  gap: "16px",
  flexWrap: "wrap"
},

darkModeButton: {
  padding: "12px 16px",
  borderRadius: "12px",
  cursor: "pointer",
  fontWeight: "600",
  transition: "all 0.2s ease",
  fontSize: "14px"
},
};

export default App;