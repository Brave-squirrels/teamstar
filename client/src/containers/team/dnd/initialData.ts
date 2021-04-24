const initialData = {
  tasks: [
    { id: "task-1", content: "Take out the garbage", status: "todo" },
    { id: "task-2", content: "Coding", status: "todo" },
    { id: "task-3", content: "Charge my phone", status: "todo" },
    { id: "task-4", content: "Cook dinner", status: "todo" },
    { id: "task-5", content: "Clean my desk", status: "todo" },
    { id: "task-6", content: "Clean my desk", status: "todo" },
    { id: "task-7", content: "Clean my desk", status: "todo" },
    { id: "task-8", content: "Clean my desk", status: "todo" },
  ],
  columns: [
    {
      id: "todo",
      title: "To do",
      taskIds: [
        "task-1",
        "task-2",
        "task-3",
        "task-4",
        "task-5",
        "task-6",
        "task-7",
        "task-8",
      ],
    },
    {
      id: "inProgress",
      title: "In progress",
      taskIds: [],
    },
    {
      id: "done",
      title: "Done",
      taskIds: [],
    },
  ],
  // Facilitate reordering of the columns
  columnOrder: ["todo", "inProgress", "done"],
};

export default initialData;
