import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Card, Badge } from "react-bootstrap";
import styles from "./dnd.module.scss";

const Task = (props: any) => {
  return (
    <Draggable draggableId={props.task.id} index={props.index}>
      {(provided, snapshot) => (
        <div
          className={styles.dndTask}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          draggable={snapshot.isDragging}
        >
          {props.task.content}{" "}
          <Badge variant="secondary">{props.task.status}</Badge>
        </div>
      )}
    </Draggable>
  );
};

export default Task;
