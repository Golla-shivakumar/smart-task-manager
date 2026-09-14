function Toast({
  message,
  type,
  darkMode
}) {

  if (!message) return null;

  const getBackgroundColor = () => {

    if (type === "success") {
      return "linear-gradient(135deg, #10b981, #059669)";
    }

    if (type === "error") {
      return "linear-gradient(135deg, #ef4444, #dc2626)";
    }

    return "linear-gradient(135deg, #3b82f6, #2563eb)";
  };

  const getIcon = () => {

    if (type === "success") {
      return "✓";
    }

    if (type === "error") {
      return "✕";
    }

    return "ℹ";
  };

  return (

    <div
      style={{
        ...styles.toast,
        background: getBackgroundColor(),
        color: "#ffffff",
        boxShadow: darkMode
          ? "0 12px 30px rgba(0,0,0,0.45)"
          : "0 12px 30px rgba(0,0,0,0.18)"
      }}
    >

      <div style={styles.icon}>
        {getIcon()}
      </div>

      <div style={styles.message}>
        {message}
      </div>

    </div>
  );
}

const styles = {

  toast: {
    position: "fixed",
    top: "24px",
    right: "24px",
    minWidth: "280px",
    padding: "16px 20px",
    borderRadius: "16px",
    display: "flex",
    alignItems: "center",
    gap: "14px",
    fontWeight: "600",
    zIndex: 9999,
    animation:
      "slideIn 0.35s ease",
    backdropFilter: "blur(8px)"
  },

  icon: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    backgroundColor:
      "rgba(255,255,255,0.18)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "700",
    fontSize: "16px",
    flexShrink: 0
  },

  message: {
    fontSize: "15px",
    lineHeight: "1.4"
  }
};

export default Toast;