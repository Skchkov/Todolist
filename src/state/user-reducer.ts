export type StateType = {
  name: string;
  age: number;
  childrenCount: number;
};
// 3 типа действия: action type!!
// Описание (тип) действиия и (возможно!!!) какие-то параметры

type ActionType = {
  type: string;
  [key: string]: any;
};

export const userReducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case "INCREMENT-AGE":
      const newState = { ...state };
      newState.age = state.age + 1;
      console.log(newState);
      return newState;
    case "INCREMENT-CHILDREN_COUNT":
      return { ...state, childrenCount: state.childrenCount + 1 };
    case "CHANGE_NAME":
      return { ...state, name: action.newName };
    case "ADD-NEW-PROP":
    default:
      throw new Error("I dont understand this type");
  }
};
