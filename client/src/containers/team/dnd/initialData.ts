const statusArr = ["", "To do", "In progress", "Done"];

export function dataModel(data: any) {
  const columns = [
    {
      id: "todo",
      title: "To do",
      taskIds: [] as any,
    },
    {
      id: "inProgress",
      title: "In progress",
      taskIds: [] as any,
    },
    {
      id: "done",
      title: "Done",
      taskIds: [] as any,
    },
  ];

  const tasks = data.map((d: any) => {
    console.log(columns[0].taskIds);
    if (d.status === 1) columns[0].taskIds.push(d.id);
    if (d.status === 2) columns[1].taskIds.push(d.id);
    if (d.status === 3) columns[2].taskIds.push(d.id);
    console.log(d);
    return { id: d.id, content: d.name, status: statusArr[d.status] };
  });

  const columnOrder = ["todo", "inProgress", "done"];

  const initialData = { tasks, columns, columnOrder };

  console.log(initialData);

  return initialData;
}

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
