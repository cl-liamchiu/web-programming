import React from "react";
import "./NewTask.css"
import { useState, useRef } from "react";

const NewTask = (props) => {
  const [enteredTask, setEnteredTask] = useState(" ");
  const ref = useRef(null);
  
  const enterTaskHandler = (event) => {
    setEnteredTask(event.target.value);
  }

  const addTaskHandler = (event) =>{
    if (event.key === "Enter"){
      event.preventDefault();
      const task = {
        title:  enteredTask,
        id: Date.now().toString(),
        isComplete: false
      };
      props.onAddTask(task);
      setEnteredTask(" ");
      ref.current.value=""
    }
  };

  return (
    <input
      id="todo-input"
      className="todo-app__input"
      placeholder="What needs to be done?"
      onChange={enterTaskHandler}
      onKeyDown={addTaskHandler}
      ref={ref}
    />
  );
};

export default NewTask;
