import React from "react";
import "./Footer.css";

const Footer = (props) => {
  const selectTaskTypeHandler = (event) => {
    // console.log(event.target.innerHTML==='All')
    props.onSelectType(event.target.innerHTML)
  }

  const clearCompletedHandler = () => {
    props.onClearCompleted()
  }

  const clearCompletedButton = () => {
    if (props.tasks.filter((task) => {
      return task.isComplete === true;
    }).length === 0) return;
    return (<button id="todo-clear-complete" onClick={clearCompletedHandler}>Clear completed</button>)
    
  }

  if (props.tasks.length === 0) return;

  return (
    <footer className="todo-app__footer" id="todo-footer">
      <div className="todo-app__total">
        <span id="todo-count">
          {
            props.tasks.filter((task) => {
              return task.isComplete === false;
            }).length
          }{" "}
        </span>
        left
      </div>
      <ul className="todo-app__view-buttons">
        <li>
          <button id="todo-all" onClick={selectTaskTypeHandler}>All</button>
        </li>
        <li>
          <button id="todo-active" onClick={selectTaskTypeHandler}>Active</button>
        </li>
        <li>
          <button id="todo-completed" onClick={selectTaskTypeHandler}>Completed</button>
        </li>
      </ul>
      <div className="todo-app__clean">
        {clearCompletedButton()}
      </div>
    </footer>
  );
};

export default Footer;
