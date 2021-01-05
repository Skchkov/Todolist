import { v1 } from "uuid";
import { FilterValuesType, TodolistType } from "../App";

export type RemoveTodoListActionType = {
  type: "REMOVE-TODOLIST";
  todolistID: string;
};

export type AddTodoListActionType = {
  type: "ADD-TODOLIST";
  title: string;
};

export type ChangeTodoListTitleActionType = {
  type: "CHANGE-TODOLIST-TITLE";
  title: string;
  todolistID: string;
};
export type ChangeTodoListFilterActionType = {
  type: "CHANGE-TODOLIST-FILTER";
  todolistID: string;
  filter: FilterValuesType;
};

type ActionType =
  | RemoveTodoListActionType
  | AddTodoListActionType
  | ChangeTodoListTitleActionType
  | ChangeTodoListFilterActionType;

export const todoListsReducer = (
  state: Array<TodolistType>,
  action: ActionType
) => {
  switch (action.type) {
    case "REMOVE-TODOLIST":
      return state.filter((tl) => tl.id !== action.todolistID);
    case "ADD-TODOLIST":
      const newTodoListID = v1();
      const newTodoList: TodolistType = {
        id: newTodoListID,
        title: action.title,
        filter: "all",
      };
      return [...state, newTodoList];
    case "CHANGE-TODOLIST-TITLE":
      const todoList = state.find((tl) => tl.id === action.todolistID);
      if (todoList) {
        todoList.title = action.title;
        return [...state];
      }
      return state;
    case "CHANGE-TODOLIST-FILTER": {
      const todoList = state.find((tl) => tl.id === action.todolistID);
      if (todoList) {
        todoList.filter = action.filter;
        return [...state];
      }
      return state;
    }
    default:
      throw new Error("I dont understand this type");
  }
};
