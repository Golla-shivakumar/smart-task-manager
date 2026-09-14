function TaskCard({
  task,
  deleteTask,
  updateTaskStatus,
  darkMode
}) {

  const getPriorityColor = () => {

    if (task.priority === "HIGH") {
      return "#ef4444";
    }

    if (task.priority === "MEDIUM") {
      return "#f59e0b";
    }

    return "#10b981";
  };

  const getStatusColor = () => {

  switch (task.status) {

    case "COMPLETED":
      return "#10b981";

    case "IN_PROGRESS":
      return "#3b82f6";

    case "REVIEW":
      return "#f59e0b";

    case "BLOCKED":
      return "#ef4444";

    default:
      return "#8b5cf6";
  }
};

  return (

    <div
      className="task-card"
      style={{
        ...styles.card,
        backgroundColor: darkMode
          ? "#1e293b"
          : "#ffffff",
        border: darkMode
          ? "1px solid #334155"
          : "1px solid #e5e7eb"
      }}
      onMouseEnter={(e) => {

        e.currentTarget.style.transform =
          "translateY(-6px)";

        e.currentTarget.style.boxShadow =
          "0 12px 24px rgba(0,0,0,0.18)";
      }}
      onMouseLeave={(e) => {

        e.currentTarget.style.transform =
          "translateY(0px)";

        e.currentTarget.style.boxShadow =
          "0 2px 6px rgba(0,0,0,0.04)";
      }}
    >

      <div style={styles.topRow}>

        <span
          style={{
            ...styles.priorityBadge,
            backgroundColor: getPriorityColor()
          }}
        >
          {task.priority}
        </span>

        <span
          style={{
            ...styles.statusBadge,
            backgroundColor: getStatusColor()
          }}
        >
          {task.status}
        </span>

      </div>

      <h3
        style={{
          ...styles.title,
          color: darkMode
            ? "#ffffff"
            : "#111827"
        }}
      >
        {task.title}
      </h3>

      <p
        style={{
          ...styles.description,
          color: darkMode
            ? "#94a3b8"
            : "#6b7280"
        }}
      >
        {task.description}
      </p>

      <div
        style={{
          ...styles.dueDate,
          color: darkMode
            ? "#94a3b8"
            : "#6b7280"
        }}
      >
        📅 Due: {task.dueDate || "No due date"}
      </div>

      <div style={styles.actions}>


  <button
    style={{
      ...styles.actionButton,
      backgroundColor: "#3b82f6",
      color: "#ffffff"
    }}
    onClick={() =>
      updateTaskStatus(
        task,
        "IN_PROGRESS"
      )
    }
  >
    In Progress
  </button>

  <button
    style={{
      ...styles.actionButton,
      backgroundColor: "#f59e0b",
      color: "#ffffff"
    }}
    onClick={() =>
      updateTaskStatus(
        task,
        "REVIEW"
      )
    }
  >
    Review
  </button>

  <button
    style={{
      ...styles.actionButton,
      backgroundColor: "#10b981",
      color: "#ffffff"
    }}
    onClick={() =>
      updateTaskStatus(
        task,
        "COMPLETED"
      )
    }
  >
    Complete
  </button>

  <button
    style={{
      ...styles.actionButton,
      backgroundColor: "#ef4444",
      color: "#ffffff"
    }}
    onClick={() =>
      updateTaskStatus(
        task,
        "BLOCKED"
      )
    }
  >
    Blocked
  </button>

  <button
    style={{
      ...styles.actionButton,
      backgroundColor: "#dc2626",
      color: "#ffffff"
    }}
    onClick={() =>
      deleteTask(task.id)
    }
  >
    Delete
  </button>



      </div>

    </div>
  );
}

const styles = {

  card: {
    borderRadius: "16px",
    padding: "22px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
    transition: "all 0.25s ease",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    cursor: "pointer"
  },

  topRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "10px"
  },

  priorityBadge: {
    color: "#ffffff",
    padding: "6px 12px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: "700",
    letterSpacing: "0.5px"
  },

  statusBadge: {
    color: "#ffffff",
    padding: "6px 12px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: "700"
  },

  title: {
    fontSize: "22px",
    fontWeight: "700",
    margin: 0,
    lineHeight: "1.3"
  },

  description: {
    lineHeight: "1.6",
    fontSize: "15px",
    margin: 0
  },

  dueDate: {
    fontSize: "14px",
    fontWeight: "500",
    marginTop: "-4px"
  },

  actions: {
    display: "flex",
    gap: "12px",
    marginTop: "10px",
    flexWrap: "wrap"
  },

  actionButton: {
    border: "none",
    padding: "10px 16px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
    transition: "all 0.2s ease",
    fontSize: "14px",
    transform: "scale(1)"
  }
};

export default TaskCard;