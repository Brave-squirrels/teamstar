import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import initialData from "./initialData";
import { DragDropContext } from "react-beautiful-dnd";

import { getTasksFetch } from "../../../reduxState/tasks/getTasks";

import styles from "./dnd.module.scss";
import Column from "./Column";
import { Container } from "react-bootstrap";
import { RootState } from "reduxState/store";

const Dnd = () => {
  const [data, setData] = useState<any>(initialData);

  const location = useLocation();
  const teamId = location.pathname.split("/")[2];

  const teamData = useSelector((state: RootState) => state.teamData.teamData);
  const tasks = useSelector((state: RootState) => state.getTasks);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTasksFetch(teamId));
    console.log(tasks);
  }, [teamData!.tasks]);

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      const newState = {
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        },
      };

      setData(newState);
      return;
    }

    // change task status
    const currentTask = data.tasks[draggableId];
    const newStatus = finish.title;

    const newTask = {
      ...currentTask,
      status: newStatus,
    };

    // Moving from one list to another
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...data,
      tasks: {
        ...data.tasks,
        [newTask.id]: newTask,
      },
      columns: {
        ...data.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    setData(newState);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Container className={styles.dndContainer}>
        {data.columnOrder.map((columnId: string) => {
          const column = data.columns[columnId];
          const tasks = column.taskIds.map(
            (taskId: string) => data.tasks[taskId]
          );

          return <Column key={column.id} column={column} tasks={tasks} />;
        })}
      </Container>
    </DragDropContext>
  );
};

export default Dnd;
