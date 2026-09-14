function StatsCards({
  tasks,
  darkMode
}) {

  const totalTasks = tasks.length;

  const completedTasks =
    tasks.filter(
      (task) =>
        task.status === "COMPLETED"
    ).length;

  const pendingTasks =
    tasks.filter(
      (task) =>
        task.status !== "COMPLETED"
    ).length;

  const highPriorityTasks =
    tasks.filter(
      (task) =>
        task.priority === "HIGH"
    ).length;

  const overdueTasks =
    tasks.filter((task) => {

      if (!task.dueDate) {
        return false;
      }

      const today = new Date();

      const dueDate =
        new Date(task.dueDate);

      return (
        dueDate < today &&
        task.status !== "COMPLETED"
      );

    }).length;

  const completionRate =
    totalTasks === 0
      ? 0
      : Math.round(
          (completedTasks / totalTasks) * 100
        );

  return (

    <section
      className="stats-grid"
      style={styles.grid}
    >

      <div
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
      "0 4px 10px rgba(0,0,0,0.03)";
  }}
>
        <h3
          style={{
            ...styles.title,
            color: darkMode
              ? "#94a3b8"
              : "#6b7280"
          }}
        >
          Total Tasks
        </h3>

        <p
          style={{
            ...styles.value,
            color: darkMode
              ? "#ffffff"
              : "#111827"
          }}
        >
          {totalTasks}
        </p>
      </div>

      <div
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
      "0 4px 10px rgba(0,0,0,0.03)";
  }}
>
        <h3
          style={{
            ...styles.title,
            color: darkMode
              ? "#94a3b8"
              : "#6b7280"
          }}
        >
          Completed
        </h3>

        <p
          style={{
            ...styles.value,
            color: darkMode
              ? "#ffffff"
              : "#111827"
          }}
        >
          {completedTasks}
        </p>
      </div>

      <div
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
      "0 4px 10px rgba(0,0,0,0.03)";
  }}
>
        <h3
          style={{
            ...styles.title,
            color: darkMode
              ? "#94a3b8"
              : "#6b7280"
          }}
        >
          Pending
        </h3>

        <p
          style={{
            ...styles.value,
            color: darkMode
              ? "#ffffff"
              : "#111827"
          }}
        >
          {pendingTasks}
        </p>
      </div>

      <div
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
      "0 4px 10px rgba(0,0,0,0.03)";
  }}
>
        <h3
          style={{
            ...styles.title,
            color: darkMode
              ? "#94a3b8"
              : "#6b7280"
          }}
        >
          High Priority
        </h3>

        <p
          style={{
            ...styles.value,
            color: darkMode
              ? "#ffffff"
              : "#111827"
          }}
        >
          {highPriorityTasks}
        </p>
      </div>

      <div
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
      "0 4px 10px rgba(0,0,0,0.03)";
  }}
>
        <h3
          style={{
            ...styles.title,
            color: darkMode
              ? "#94a3b8"
              : "#6b7280"
          }}
        >
          Overdue
        </h3>

        <p
          style={{
            ...styles.value,
            color: darkMode
              ? "#ffffff"
              : "#111827"
          }}
        >
          {overdueTasks}
        </p>
      </div>

      <div
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
      "0 4px 10px rgba(0,0,0,0.03)";
  }}
>
        <h3
          style={{
            ...styles.title,
            color: darkMode
              ? "#94a3b8"
              : "#6b7280"
          }}
        >
          Completion Rate
        </h3>

        <p
          style={{
            ...styles.value,
            color: darkMode
              ? "#ffffff"
              : "#111827"
          }}
        >
          {completionRate}%
        </p>
      </div>

    </section>
  );
}

const styles = {

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
    marginBottom: "28px"
  },

  card: {
    borderRadius: "18px",
    padding: "24px",
    boxShadow:
      "0 4px 10px rgba(0,0,0,0.03)",
    transition: "all 0.2s ease",
    cursor: "pointer",
transform: "translateY(0px)",
transition: "all 0.25s ease"
  },

  title: {
    fontSize: "14px",
    fontWeight: "600"
  },

  value: {
    fontSize: "36px",
    fontWeight: "700",
    marginTop: "10px"
  }
};

export default StatsCards;