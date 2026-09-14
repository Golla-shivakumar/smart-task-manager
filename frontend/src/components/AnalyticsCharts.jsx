import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts";

function AnalyticsCharts({
  tasks,
  darkMode
}) {

  const statusData = [

    {
      name: "TODO",
      value: tasks.filter(
        (task) =>
          task.status === "TODO"
      ).length
    },

    {
      name: "IN_PROGRESS",
      value: tasks.filter(
        (task) =>
          task.status ===
          "IN_PROGRESS"
      ).length
    },

    {
      name: "REVIEW",
      value: tasks.filter(
        (task) =>
          task.status === "REVIEW"
      ).length
    },

    {
      name: "COMPLETED",
      value: tasks.filter(
        (task) =>
          task.status ===
          "COMPLETED"
      ).length
    }
  ];

  const priorityData = [

    {
      name: "HIGH",
      value: tasks.filter(
        (task) =>
          task.priority === "HIGH"
      ).length
    },

    {
      name: "MEDIUM",
      value: tasks.filter(
        (task) =>
          task.priority ===
          "MEDIUM"
      ).length
    },

    {
      name: "LOW",
      value: tasks.filter(
        (task) =>
          task.priority === "LOW"
      ).length
    }
  ];

  const COLORS = [
    "#8b5cf6",
    "#3b82f6",
    "#f59e0b",
    "#10b981"
  ];

  return (

    <section style={styles.wrapper}>

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
      >

        <h2
          style={{
            ...styles.title,
            color: darkMode
              ? "#ffffff"
              : "#111827"
          }}
        >
          Task Status Analytics
        </h2>

        <ResponsiveContainer
          width="100%"
          height={320}
        >

          <PieChart>

            <Pie
              data={statusData}
              dataKey="value"
              outerRadius={110}
              label
            >

              {statusData.map(
                (_, index) => (

                  <Cell
                    key={index}
                    fill={
                      COLORS[index]
                    }
                  />
                )
              )}

            </Pie>

            <Tooltip />

          </PieChart>

        </ResponsiveContainer>

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
      >

        <h2
          style={{
            ...styles.title,
            color: darkMode
              ? "#ffffff"
              : "#111827"
          }}
        >
          Priority Distribution
        </h2>

        <ResponsiveContainer
          width="100%"
          height={320}
        >

          <BarChart
            data={priorityData}
          >

            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="value"
              fill="#7c3aed"
              radius={[8, 8, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </section>
  );
}

const styles = {

  wrapper: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(420px, 1fr))",
    gap: "24px",
    marginTop: "30px"
  },

  card: {
    borderRadius: "18px",
    padding: "22px",
    boxShadow:
      "0 4px 12px rgba(0,0,0,0.05)"
  },

  title: {
    fontSize: "20px",
    fontWeight: "700",
    marginBottom: "18px"
  }
};

export default AnalyticsCharts;