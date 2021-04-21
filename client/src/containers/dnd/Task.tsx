import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Card, Badge } from "react-bootstrap";

const Task = (props: any) => {
  return (
    <Draggable draggableId={props.task.id} index={props.index}>
      {(provided, snapshot) => (
        <Card
          body
          className="m-2"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          draggable={snapshot.isDragging}
        >
          {props.task.content}{" "}
          <Badge variant="secondary">{props.task.status}</Badge>
        </Card>
      )}
    </Draggable>
  );
};

export default Task;
