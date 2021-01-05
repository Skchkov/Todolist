import { Button, ButtonGroup, Checkbox, IconButton } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import React, { ChangeEvent } from "react";
import AddItemForm from "./AddItemForm";
import { FilterValuesType } from "./App";
import EditableSpan from "./EditableSpan";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  id: string;
  title: string;
  tasks: Array<TaskType>;
  filter: FilterValuesType;
  removeTodoList: (todolistID: string) => void;
  addTask: (title: string, todolistID: string) => void;
  removeTask: (taskId: string, todolistID: string) => void;
  changeFilter: (filterValue: FilterValuesType, todolistID: string) => void;
  changeStatus: (taskId: string, isDone: boolean, todolistID: string) => void;
  changeTaskTitle: (taskId: string, title: string, todolistID: string) => void;
  changeTodoListTitle: (todolistID: string, title: string) => void;
};

function Todolist(props: PropsType) {
  const tasks = props.tasks.map((taskObj) => {
    const removeTask = () => {
      props.removeTask(taskObj.id, props.id);
    };
    const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
      props.changeStatus(taskObj.id, e.currentTarget.checked, props.id);
    };
    const changeTaskTitle = (title: string) => {
      props.changeTaskTitle(taskObj.id, title, props.id);
    };
    return (
      <li key={taskObj.id} className={taskObj.isDone ? "is-done" : ""}>
        <Checkbox
          color={"primary"}
          onChange={changeStatus}
          checked={taskObj.isDone}
        />
        {/* <input
          onChange={changeStatus}
          type="checkbox"
          checked={taskObj.isDone}
        /> */}
        <EditableSpan value={taskObj.title} getNewTitle={changeTaskTitle} />
        {/* <button onClick={removeTask}>x</button> */}
        <IconButton onClick={removeTask}>
          <Delete />
        </IconButton>
      </li>
    );
  });

  const onAllKlickHandler = () => {
    props.changeFilter("all", props.id);
  };

  const onActiveKlickHandler = () => {
    props.changeFilter("active", props.id);
  };

  const onCompletedKlickHandler = () => {
    props.changeFilter("completed", props.id);
  };
  const removeTodoList = () => {
    props.removeTodoList(props.id);
  };
  const addTask = (title: string) => {
    props.addTask(title, props.id);
  };

  const changeTodoListTitle = (title: string) => {
    props.changeTodoListTitle(props.id, title);
  };

  return (
    <div>
      <h3>
        <EditableSpan value={props.title} getNewTitle={changeTodoListTitle} />
        {/* <button onClick={removeTodoList}>X</button> */}
        <IconButton onClick={removeTodoList}>
          <Delete />
        </IconButton>
      </h3>
      <AddItemForm addItem={addTask} />
      <ul style={{ listStyle: "none", paddingLeft: "0" }}>{tasks}</ul>
      <div style={{ textAlign: "center" }}>
        <ButtonGroup size={"small"} color={"primary"}>
          <Button
            variant={props.filter === "all" ? "contained" : "outlined"}
            onClick={onAllKlickHandler}
          >
            All
          </Button>
          <Button
            variant={props.filter === "active" ? "contained" : "outlined"}
            onClick={onActiveKlickHandler}
          >
            Active
          </Button>
          <Button
            variant={props.filter === "completed" ? "contained" : "outlined"}
            onClick={onCompletedKlickHandler}
          >
            Completed
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
}

export default Todolist;
