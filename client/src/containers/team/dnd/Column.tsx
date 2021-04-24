import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { Card } from "react-bootstrap";
import styles from "./dnd.module.scss";

import Task from "./Task";

const Column = (props: any) => {
  return (
    <Card className={`mt-5 mr-3 w-100 ${styles.dndCard}`}>
      <Card.Header className={styles.headerWrapper}>
        <div>{props.column.title}</div>
        
          {props.column.title == "To do" ? <div className={styles.addTask}>New Task</div>: null}
        
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
