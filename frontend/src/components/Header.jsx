function Header() {

  return (
    <header style={styles.header}>

      <div>
        <h1 style={styles.title}>
          Dashboard
        </h1>

        <p style={styles.subtitle}>
          Manage your daily workflow
        </p>
      </div>

    </header>
  );
}

const styles = {

  header: {
    backgroundColor: "#ffffff",
    padding: "24px 40px",
    borderBottom: "1px solid #e5e7eb",
    marginLeft: "240px"
  },

  title: {
    fontSize: "32px",
    fontWeight: "700",
    marginBottom: "6px"
  },

  subtitle: {
    color: "#6b7280",
    fontSize: "15px"
  }
};

export default Header;