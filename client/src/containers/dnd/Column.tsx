import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { ListGroup } from "react-bootstrap";
import { Card } from "react-bootstrap";

import Task from "./Task";

const InnerList = (props: any) => {
  return props.tasks.map((task: any, index: any) => {
    return <Task key={task.id} task={task} index={index} />;
  });
};

const Column = (props: any) => {
  return (
    <Draggable draggableId={props.column.id} index={props.index}>
      {(provided) => (
        <Card
          className="mt-5 mr-3"
          bg="light"
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <Card.Header {...provided.dragHandleProps}>
            {props.column.title}
          </Card.Header>
          <Card.Body>
            <Droppable droppableId={props.column.id} type="task">
              {(provided, snapshot) => (
                <ListGroup
                  style={{ width: "300px", height: "350px" }}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  draggable={snapshot.isDraggingOver}
                >
                  <InnerList tasks={props.tasks} column={props.column.title} />
                  {provided.placeholder}
                </ListGroup>
              )}
            </Droppable>
          </Card.Body>
        </Card>
      )}
    </Draggable>
  );
};

export default Column;
