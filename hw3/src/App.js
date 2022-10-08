import React from "react";
import "./App.css";
import TaskList from "./components/TaskList";

const App = () => {

  return (
    <div className="body">
      <div id="root" className="todo-app__root">
        <header className="todo-app__header">
          <h1 className="todo-app__title">todos</h1>
        </header>
        <TaskList />
      </div>
    </div>
  );
};

export default App;
