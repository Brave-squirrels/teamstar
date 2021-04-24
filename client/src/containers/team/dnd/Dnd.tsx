import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import initialData, { dataModel } from "./initialData";
import { DragDropContext } from "react-beautiful-dnd";

import { changeStatusFetch } from "reduxState/tasks/changeStatus";
import { getTasksFetch } from "../../../reduxState/tasks/getTasks";

import styles from "./dnd.module.scss";
import Column from "./Column";
import { Container } from "react-bootstrap";
import { RootState } from "reduxState/store";

const Dnd = () => {
  const [data, setData] = useState<any>(initialData);

  const location = useLocation();
  const teamId = location.pathname.split("/")[2];

  const createState = useSelector((state: RootState) => state.createTask);
  const teamData = useSelector((state: RootState) => state.teamData.teamData);
  const tasks = useSelector((state: RootState) => state.getTasks);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTasksFetch(teamId));
    //eslint-disable-next-line
  }, [teamId, createState.success]);

  useEffect(() => {
    setData(dataModel(tasks.taskData));
  }, [tasks]);

  const onDragEnd = (result: any) => {
    if (teamData!.tasks) {
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

      const start = data.columns.filter(
        (e: any) => e.id === source.droppableId
      )[0];
      const finish = data.columns.filter(
        (e: any) => e.id === destination.droppableId
      )[0];

      if (start === finish) {
        const newTaskIds = Array.from(start.taskIds);
        newTaskIds.splice(source.index, 1);
        newTaskIds.splice(destination.index, 0, draggableId);

        const newColumn = {
          ...start,
          taskIds: newTaskIds,
        };

        let index = 0;
        data.columns.forEach((e: any, i: number) => {
          if (e.id === newColumn.id) index = i;
        });

        const newState = {
          ...data,
          columns: [...data.columns],
        };

        newState.columns.splice(index, 1);
        newState.columns.splice(index, 0, newColumn);

        setData(newState);
        return;
      }

      // change task status
      const newStatus = finish.title;
      const currentTask = data.tasks.filter(
        (e: any) => e.id === draggableId
      )[0];

      const st =
        newStatus === "To do" ? 0 : newStatus === "In progress" ? 1 : 2;

      dispatch(changeStatusFetch(teamId, currentTask.id, { status: st }));

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

      let indexT = 0;
      data.tasks.forEach((e: any, i: number) => {
        if (e.id === newTask.id) indexT = i;
      });

      let indexCS = 0;
      data.columns.forEach((e: any, i: number) => {
        if (e.id === newStart.id) indexCS = i;
      });

      let indexCF = 0;
      data.columns.forEach((e: any, i: number) => {
        if (e.id === newFinish.id) indexCF = i;
      });

      const newState = {
        ...data,
        tasks: [...data.tasks],
        columns: [...data.columns],
      };

      newState.tasks.splice(indexT, 1);
      newState.tasks.splice(indexT, 0, newTask);

      newState.columns.splice(indexCS, 1);
      newState.columns.splice(indexCS, 0, newStart);

      newState.columns.splice(indexCF, 1);
      newState.columns.splice(indexCF, 0, newFinish);

      setData(newState);
    }
  };

  return (
    <>
      {teamData!.tasks ? (
        <DragDropContext onDragEnd={onDragEnd}>
          <Container className={styles.dndContainer}>
            {data.columnOrder.map((columnId: string) => {
              const column = data.columns.filter((e: any) => e.id === columnId);

              const tasks = column[0].taskIds.map((taskId: string) =>
                data.tasks.filter((e: any) => e.id === taskId)
              );

              return (
                <Column key={column[0].id} column={column} tasks={tasks} />
              );
            })}
          </Container>
        </DragDropContext>
      ) : (
        <span>CZEKAJ SE XD</span>
      )}
    </>
  );
};

export default Dnd;
