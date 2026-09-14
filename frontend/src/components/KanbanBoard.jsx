import {
  DragDropContext,
  Droppable,
  Draggable
} from "@hello-pangea/dnd";

function KanbanBoard({
  tasks,
  darkMode,
  updateTaskStatus
}) {

  const columns = {
    TODO: "TODO",
    IN_PROGRESS: "IN PROGRESS",
    REVIEW: "REVIEW",
    COMPLETED: "COMPLETED"
  };

  const onDragEnd = (result) => {

    if (!result.destination) return;

    const taskId =
      result.draggableId;

    const newStatus =
      result.destination.droppableId;

    const task =
      tasks.find(
        (t) =>
          String(t.id) === taskId
      );

    if (!task) return;

    updateTaskStatus(
      task,
      newStatus
    );
  };

  return (

    <DragDropContext
      onDragEnd={onDragEnd}
    >

      <div style={styles.board}>

        {Object.entries(columns).map(
          ([key, label]) => {

            const columnTasks =
              tasks.filter(
                (task) =>
                  task.status === key
              );

            return (

              <Droppable
                droppableId={key}
                key={key}
              >

                {(provided) => (

                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={{
                      ...styles.column,
                      backgroundColor:
                        darkMode
                          ? "#1e293b"
                          : "#ffffff",
                      border: darkMode
                        ? "1px solid #334155"
                        : "1px solid #e5e7eb"
                    }}
                  >

                    <h3
                      style={{
                        ...styles.columnTitle,
                        color: darkMode
                          ? "#ffffff"
                          : "#111827"
                      }}
                    >
                      {label}
                    </h3>

                    {columnTasks.map(
                      (task, index) => (

                        <Draggable
                          draggableId={String(task.id)}
                          index={index}
                          key={task.id}
                        >

                          {(provided) => (

                            <div
                              ref={
                                provided.innerRef
                              }
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{
                                ...styles.task,
                                ...provided
                                  .draggableProps
                                  .style,
                                backgroundColor:
                                  darkMode
                                    ? "#0f172a"
                                    : "#f8fafc",
                                color: darkMode
                                  ? "#ffffff"
                                  : "#111827"
                              }}
                            >

                              <h4
                                style={{
                                  marginBottom:
                                    "8px"
                                }}
                              >
                                {task.title}
                              </h4>

                              <p
                                style={{
                                  fontSize: "14px",
                                  opacity: 0.7
                                }}
                              >
                                {
                                  task.description
                                }
                              </p>

                            </div>
                          )}

                        </Draggable>
                      )
                    )}

                    {provided.placeholder}

                  </div>
                )}

              </Droppable>
            );
          }
        )}

      </div>

    </DragDropContext>
  );
}

const styles = {

  board: {
    display: "grid",
    gridTemplateColumns:
      "repeat(4, 1fr)",
    gap: "20px",
    marginTop: "30px"
  },

  column: {
    borderRadius: "16px",
    padding: "18px",
    minHeight: "500px"
  },

  columnTitle: {
    fontSize: "18px",
    fontWeight: "700",
    marginBottom: "20px"
  },

  task: {
    padding: "14px",
    borderRadius: "12px",
    marginBottom: "14px",
    cursor: "grab",
    border: "1px solid #334155"
  }
};

export default KanbanBoard;