import React, { useState } from "react";
import initialData from "./initialData";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { Container } from "react-bootstrap";

import Column from "./Column";

interface IInnerList {
  key: string;
  column: any;
  index: number;
  taskMap: any;
}

const InnerList = (props: IInnerList) => {
  const { column, taskMap, index } = props;
  const tasks = column.taskIds.map((taskId: string) => taskMap[taskId]);
  return <Column column={column} tasks={tasks} index={index} />;
};

const Dnd = () => {
  const [data, setData] = useState<any>(initialData);

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "column") {
      const newColumnOrder = Array.from(data.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const newState = {
        ...data,
        columnOrder: newColumnOrder,
      };
      setData(newState);
      return;
    }

    const home = data.columns[source.droppableId];
    const foreign = data.columns[destination.droppableId];

    if (home === foreign) {
      const newTaskIds = Array.from(home.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newHome = {
        ...home,
        taskIds: newTaskIds,
      };

      const newState = {
        ...data,
        columns: {
          ...data.columns,
          [newHome.id]: newHome,
        },
      };

      setData(newState);
      return;
    }

    // change task status
    const currentTask = data.tasks[draggableId];
    const newStatus = foreign.title;

    const newTask = {
      ...currentTask,
      status: newStatus,
    };

    // moving from one list to another
    const homeTaskIds = Array.from(home.taskIds);
    homeTaskIds.splice(source.index, 1);
    const newHome = {
      ...home,
      taskIds: homeTaskIds,
    };

    const foreignTaskIds = Array.from(foreign.taskIds);
    foreignTaskIds.splice(destination.index, 0, draggableId);
    const newForeign = {
      ...foreign,
      taskIds: foreignTaskIds,
    };

    const newState = {
      ...data,
      tasks: {
        ...data.tasks,
        [newTask.id]: newTask,
      },
      columns: {
        ...data.columns,
        [newHome.id]: newHome,
        [newForeign.id]: newForeign,
      },
    };
    setData(newState);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="all-columns" direction="horizontal" type="column">
        {(provided) => (
          <Container
            className="d-flex flex-row "
            style={{ minWidth: "800px" }}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {data.columnOrder.map((columnId: string, index: number) => {
              const column = data.columns[columnId];

              return (
                <InnerList
                  key={column.id}
                  column={column}
                  index={index}
                  taskMap={data.tasks}
                />
              );
            })}
            {provided.placeholder}
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Dnd;
