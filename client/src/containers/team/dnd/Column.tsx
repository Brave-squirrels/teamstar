import React, { useState, useEffect } from "react";
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
import { RootState } from "reduxState/store";

const Column = (props: any) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const createState = useSelector((state: RootState) => state.createTask);
  const teamId = location.pathname.split("/")[2];
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({
    name: {
      val: "",
      inputType: "input",
      type: "text",
      placeholder: "Title",
      label: "Title",
      validation: {
        required: true,
        minLength: 3,
        maxLength: 24,
      },
      error: "Title should be between 3 and 24 characters long",
      valid: false,
      touched: false,
    },
    description: {
      val: "",
      inputType: "textarea",
      placeholder: "Description",
      label: "Description",
      validation: {
        required: true,
        minLength: 0,
        maxLength: 254,
      },
      error: "Description should be max 255 characters long",
      valid: false,
      touched: false,
    },
    formValid: false,
  });
  const handleCreateTask = (e: any) => {
    e.preventDefault();
    dispatch(createTaskFetch(mutateToAxios(form), teamId));
  };
  return (
    <Card className={`mt-5 mr-3 w-100 ${styles.dndCard}`}>
      <Card.Header className={styles.headerWrapper}>
        <div>{props.column.title}</div>

        {props.column.title === "To do" ? (
          <>
            <InviteModal
              show={showCreate}
              onHide={() => setShowCreate(false)}
              title="Create task"
            >
              <FormStructure
                state={form}
                setState={setForm}
                btnText="Create"
                title=""
                submitted={handleCreateTask}
                spinner={createState.loading}
              />
            </InviteModal>
            <div className={styles.addTask} onClick={() => setShowCreate(true)}>
              New Task
            </div>
          </>
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
