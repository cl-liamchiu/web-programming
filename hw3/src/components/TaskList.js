import React, { useState } from "react";
import Task from "./Task";
import NewTask from "./NewTask";
import Footer from "./Footer";
import "./TaskList.css";

const TaskList = () => {
  const [allTasks, setAllTasks] = useState([]);
  const [type, setType] = useState('All');

  const addTaskHandler = (newTask) => {
    setAllTasks((preTasks) => {
      return [...preTasks, newTask];
    });
  };

  const checkTaskHandler = (id, isChecked) => {
    setAllTasks((tasks) => {
      tasks.forEach((task) => {
        if (task.id === id) task.isComplete = isChecked;
      });
      return [...tasks];
    });
  };

  const deleteTaskHandler = (id) => {
    const unDeleteTask = allTasks.filter((task) => {
      return task.id !== id;
    });
    setAllTasks(unDeleteTask);
  };

  const setTypeHandler = (type) => {
    setType(type);
  };

  const selectTasksHandler = (type) => {
    if (type === "Completed") {return allTasks.filter((task) => {return task.isComplete === true})}
    else if (type === "Active") {return allTasks.filter((task) => {return task.isComplete === false})}
    else {return allTasks}
  };

  const clearCompletedHandler = () => {
    setAllTasks(allTasks.filter((task) => {
      return task.isComplete === false;
    }))
  }

  return (
    <section className="todo-app__main">
      <NewTask onAddTask={addTaskHandler} />
      <ul className="todo-app__list" id="todo-list">
        {selectTasksHandler(type).map((task) => (
          <Task
            task={task}
            key={task.id}
            onCheckTask={checkTaskHandler}
            onDeleteTask={deleteTaskHandler}
          ></Task>
        ))}
      </ul>
      <Footer tasks={allTasks} onSelectType={setTypeHandler} onClearCompleted={clearCompletedHandler}></Footer>
    </section>
  );
};

export default TaskList;
