import {
  AppBar,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import React, { useState } from "react";
import { v1 } from "uuid";
import AddItemForm from "./AddItemForm";
import "./App.css";
import Todolist from "./Todolist";
import { TaskType } from "./Todolist";

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

type TaskStateType = {
  [key: string]: Array<TaskType>;
};

function App() {
  //BLL
  const todolistID1 = v1();
  const todolistID2 = v1();

  const [todoLists, setTodolists] = useState<Array<TodolistType>>([
    { id: todolistID1, title: "What to learn", filter: "all" },
    { id: todolistID2, title: "What to buy", filter: "all" },
  ]);

  const [tasks, setTasks] = useState<TaskStateType>({
    [todolistID1]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "ReactJs", isDone: false },
    ],
    [todolistID2]: [
      { id: v1(), title: "Beer", isDone: true },
      { id: v1(), title: "Fist", isDone: true },
      { id: v1(), title: "Fish", isDone: false },
    ],
  });

  function removeTask(taskId: string, todolistID: string) {
    const todoListTasks = tasks[todolistID];
    tasks[todolistID] = todoListTasks.filter((t) => t.id !== taskId);
    setTasks({ ...tasks });
  }
  function addTask(title: string, todolistID: string) {
    const newTask: TaskType = {
      id: v1(),
      title: title,
      isDone: false,
    };
    tasks[todolistID] = [newTask, ...tasks[todolistID]];
    setTasks({ ...tasks });
  }

  function changeStatus(taskId: string, isDone: boolean, todolistID: string) {
    const todoListTasks = tasks[todolistID];
    const task = todoListTasks.find((task) => task.id === taskId);
    if (task) {
      task.isDone = isDone;
      setTasks({ ...tasks });
    }
  }
  function changeTaskTitle(taskId: string, title: string, todolistID: string) {
    const todoListTasks = tasks[todolistID];
    const task = todoListTasks.find((task) => task.id === taskId);
    if (task) {
      task.title = title;
      setTasks({ ...tasks });
    }
  }

  function removeTodoList(todolistID: string) {
    setTodolists(todoLists.filter((tl) => tl.id !== todolistID));
    delete tasks[todolistID];
    setTasks({ ...tasks });
  }
  function addTodoList(title: string) {
    const newTodoListID = v1();
    const newTodoList: TodolistType = {
      id: newTodoListID,
      title: title,
      filter: "all",
    };
    setTodolists([...todoLists, newTodoList]);
    setTasks({
      ...tasks,
      [newTodoListID]: [],
    });
  }
  function changeTodoListTitle(todolistID: string, title: string) {
    const todoList = todoLists.find((tl) => tl.id === todolistID);
    if (todoList) {
      todoList.title = title;
      setTodolists([...todoLists]);
    }
  }
  function changeFilter(filterValue: FilterValuesType, todolistID: string) {
    const todoList = todoLists.find((tl) => tl.id === todolistID);
    if (todoList) {
      todoList.filter = filterValue;
      setTodolists([...todoLists]);
    }
  }

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Typography variant="h6">News</Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed={true}>
        <Grid container={true} style={{ padding: "15px" }}>
          <AddItemForm addItem={addTodoList} />
        </Grid>
        <Grid container={true} spacing={5}>
          {todoLists.map((tl) => {
            let taskForTodolist = tasks[tl.id];
            if (tl.filter === "active") {
              taskForTodolist = tasks[tl.id].filter(
                (task) => task.isDone === false
              );
            }
            if (tl.filter === "completed") {
              taskForTodolist = tasks[tl.id].filter(
                (task) => task.isDone === true
              );
            }
            return (
              <Grid item>
                <Paper
                  elevation={10}
                  style={{ padding: "15px", borderRadius: "15px" }}
                >
                  <Todolist
                    key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    tasks={taskForTodolist}
                    filter={tl.filter}
                    addTask={addTask}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    changeStatus={changeStatus}
                    removeTodoList={removeTodoList}
                    changeTaskTitle={changeTaskTitle}
                    changeTodoListTitle={changeTodoListTitle}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default App;
