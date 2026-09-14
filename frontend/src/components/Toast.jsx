function Toast({ message, type = "success", darkMode }) {

  if (!message) {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        zIndex: 9999,
        padding: "16px 22px",
        borderRadius: "12px",
        backgroundColor:
          type === "error"
            ? "#dc2626"
            : "#16a34a",
        color: "#ffffff",
        fontSize: "15px",
        fontWeight: "600",
        boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
        minWidth: "220px"
      }}
    >
      {message}
    </div>
  );
}

export default Toast;