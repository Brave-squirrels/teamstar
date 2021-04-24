import MyVerticallyCenteredModal from "containers/user/settings/MyVerticallyCenteredModal";
import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Card, Badge } from "react-bootstrap";

const Task = (props: any) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <Draggable draggableId={props.task.id} index={props.index}>
        {(provided, snapshot) => (
          <Card
            className="m-3 "
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            draggable={snapshot.isDragging}
          >
            <Card.Body
              className=" d-flex align-items-center justify-content-between"
              onClick={() => setShow(true)}
            >
              {props.task.content}{" "}
              <Badge variant="secondary" className="ml-1">
                {props.task.status}
              </Badge>
            </Card.Body>
          </Card>
        )}
      </Draggable>
      <MyVerticallyCenteredModal
        show={show}
        onHide={() => setShow(false)}
        title={"Details"}
      >
        {props.task.content}
      </MyVerticallyCenteredModal>
    </>
  );
};

export default Task;
