const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8080";

const TASK_API_URL = `${API_URL}/api/tasks`;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  };
};

export const fetchTasksApi = async () => {
  const response = await fetch(TASK_API_URL, {
    method: "GET",
    headers: getAuthHeaders()
  });

  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }

  return response.json();
};

export const createTaskApi = async (task) => {
  return fetch(TASK_API_URL, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(task)
  });
};

export const deleteTaskApi = async (id) => {
  return fetch(`${TASK_API_URL}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders()
  });
};

export const updateTaskApi = async (task, newStatus) => {
  const updatedTask = {
    ...task,
    status: newStatus
  };

  return fetch(`${TASK_API_URL}/${task.id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(updatedTask)
  });
};