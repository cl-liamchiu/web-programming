import React from "react";
import "./Task.css";
import x_img from "../x.png";

const Task = (props) => {
  const checkTaskHandler = (event) => {
    props.onCheckTask(props.task.id, event.target.checked);
  };

  const deleteTaskHandler = () => {
    props.onDeleteTask(props.task.id);
  };

  return (
    <li className="todo-app__item">
      <div className="todo-app__checkbox">
        <input
          type="checkbox"
          id={props.task.id}
          onChange={checkTaskHandler}
          checked={props.task.isComplete ? true : false}
        />
        <label htmlFor={props.task.id} />
      </div>
      <h1
        className={
          props.task.isComplete
            ? "todo-app__item-detail-checked"
            : "todo-app__item-detail"
        }
      >
        {props.task.title}
      </h1>
      <img
        src={x_img}
        alt="x.png"
        className="todo-app__item-x"
        onClick={deleteTaskHandler}
      />
    </li>
  );
};

export default Task;
