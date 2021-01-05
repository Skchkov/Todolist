import { IconButton, TextField } from "@material-ui/core";
import { AddBox } from "@material-ui/icons";
import React, { ChangeEvent, KeyboardEvent, useState } from "react";

type AddItemFormPropsType = {
  addItem: (title: string) => void;
};

function AddItemForm(props: AddItemFormPropsType) {
  const [title, setTitle] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setTitle(e.currentTarget.value);
  };
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") addItem();
  };
  const addItem = () => {
    const trimmedTitle = title.trim();
    if (trimmedTitle) {
      props.addItem(trimmedTitle);
      setTitle("");
    } else {
      setError("Title is required!");
    }
    setTitle("");
  };
  return (
    <div>
      <TextField
        value={title}
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
        label={"Title"}
        error={!!error}
        helperText={error}
      />
      {/* <input
        value={title}
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
        className={error ? "error" : ""}
      /> */}
      {/* <button onClick={addItem}>+</button> */}
      <IconButton color={"primary"} onClick={addItem}>
        <AddBox />
      </IconButton>
      {/* <Button onClick={addItem} variant={"contained"} color={"primary"}>
        +
      </Button> */}
      {/* {error && <div className={"error-message"}>{error}</div>} */}
    </div>
  );
}

export default AddItemForm;
