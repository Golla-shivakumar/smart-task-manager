function Sidebar({ darkMode, onLogout }) {

  return (

    <aside
      className="sidebar"
      style={styles.sidebar}
    >

      <div style={styles.logo}>
        TaskFlow
      </div>

      <nav style={styles.nav}>

        <button style={styles.navButton}>
          Dashboard
        </button>

        <button style={styles.navButton}>
          Tasks
        </button>

        <button style={styles.navButton}>
          Analytics
        </button>

        <button style={styles.navButton}>
          Settings
        </button>

      </nav>

      <button
        onClick={onLogout}
        style={styles.logoutButton}
      >
        Logout
      </button>

    </aside>
  );
}

const styles = {

  sidebar: {
    width: "220px",
    backgroundColor: "#0f172a",
    padding: "24px 18px",
    boxSizing: "border-box",
    flexShrink: 0,
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh"
  },

  logo: {
    color: "#ffffff",
    fontSize: "36px",
    fontWeight: "700",
    marginBottom: "40px"
  },

  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "14px"
  },

  navButton: {
    border: "none",
    backgroundColor: "#1e293b",
    color: "#ffffff",
    padding: "14px 18px",
    borderRadius: "12px",
    cursor: "pointer",
    textAlign: "left",
    fontSize: "15px",
    fontWeight: "600",
    transition: "all 0.2s ease"
  },

  logoutButton: {
    marginTop: "auto",
    border: "none",
    backgroundColor: "#dc2626",
    color: "#ffffff",
    padding: "14px 18px",
    borderRadius: "12px",
    cursor: "pointer",
    textAlign: "left",
    fontSize: "15px",
    fontWeight: "600"
  }

};

export default Sidebar;