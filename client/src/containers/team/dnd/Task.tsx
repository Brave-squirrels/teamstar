import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Card, Badge } from "react-bootstrap";

const Task = (props: any) => {
  return (
    <Draggable draggableId={props.task.id} index={props.index}>
      {(provided, snapshot) => (
        <Card
          className="m-3 "
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          draggable={snapshot.isDragging}
        >
          <Card.Body className=" d-flex align-items-center justify-content-between">
            {props.task.content}{" "}
            <Badge variant="secondary" className="ml-1">
              {props.task.status}
            </Badge>
          </Card.Body>
        </Card>
      )}
    </Draggable>
  );
};

export default Task;
