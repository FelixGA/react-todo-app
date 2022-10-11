import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import { useState } from "react";
import { nanoid } from "nanoid";

function App(props) {
  // Array mit Todo-Objects aus index.js wird an useState übergeben und in Variable tasks gespeichert
  const [tasks, setTasks] = useState(props.tasks);
  //  Array mit tasks wird an Todos übergeben

  // callback function
  // nimmt Event name(String) von child-component Form an
  function addTask(name) {
    const newTask = {
      // da tasks ein Array mit objects ist, muss name(String) in object gewandelt werden
      id: `todo-${nanoid()}`,
      name,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  }

  const taskList = tasks.map((task) => (
    <Todo
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
    />
  ));

  const taskNoun = taskList.length > 1 ? 'tasks' : 'task';
  const headingText = `${taskList.length} ${taskNoun} remaining`;

  function toggleTaskCompleted(id) {
    // console.log(tasks[0]);
    const updatedTasks = tasks.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // use object spread to make a new object
        // whose `completed` prop has been inverted
        return {...task, completed: !task.completed}
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function deleteTask(id) {
    // console.log(id);
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      {/*Übergabe der callback function an child-component*/}
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        <FilterButton />
        <FilterButton />
        <FilterButton />
      </div>
      <h2 id="list-heading">{headingText}</h2>
      <ul
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}

        {/* wenn es das Array tasklist nicht gäbe:
       <Todo name="Eat" completed={true} id="todo-0" />
       <Todo name="Sleep" completed={false} id="todo-1" />
       <Todo name="Repeat" completed={false} id="todo-2" /> */}
      </ul>
    </div>
  );
}

export default App;
