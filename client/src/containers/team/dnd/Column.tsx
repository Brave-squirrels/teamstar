import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Droppable } from "react-beautiful-dnd";
import { Card } from "react-bootstrap";
import styles from "./dnd.module.scss";
import InviteModal from "components/inviteModal/inviteModal";

import Task from "./Task";
import FormStructure from "containers/form/formStructure";

import { mutateToAxios } from "utils/onChangeForm";
import { createTaskFetch } from "reduxState/tasks/createTask";

const Column = (props: any) => {
  const location = useLocation();
  const teamId = location.pathname.split("/")[2];
  return (
    <Card className={`mt-5 mr-3 w-100 ${styles.dndCard}`}>
      <Card.Header className={styles.headerWrapper}>
        <div>{props.column.title}</div>

        {props.column.title == "To do" ? (
          <div className={styles.addTask}>New Task</div>
        ) : null}
      </Card.Header>
      <div>
        <Droppable droppableId={props.column.id} type="task">
          {(provided, snapshot) => (
            <div
              className={styles.dndTaskContainer}
              ref={provided.innerRef}
              {...provided.droppableProps}
              draggable={snapshot.isDraggingOver}
            >
              {props.tasks.map((task: any, index: any) => {
                return <Task key={task.id} task={task} index={index} />;
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </Card>
  );
};

export default Column;
