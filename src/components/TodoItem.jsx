/* eslint react/prop-types: 0 */
import { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import styles from "./TodoItem.module.css";

const TodoItem = (props) => {
  const [editing, setEditing] = useState(false);

  const handleEditing = () => {
    setEditing(true);
  };

  const handleUpdatedDone = (event) => {
    if (event.key === "Enter") {
      setEditing(false);
    }
  };

  const completedStyle = {
    fontStyle: "italic",
    color: "#595959",
    opacity: 0.4,
    textDecoration: "line-through",
  };

  const { completed, id, title, category, priority } = props.todo;

  const viewMode = {};
  const editMode = {};

  if (editing) {
    viewMode.display = "none";
  } else {
    editMode.display = "none";
  }

  useEffect(
    () => () => {
      console.log("Cleaning up...");
    },
    []
  );

  return (
    <li className={styles.item} data-type="todo-item">
      <div onDoubleClick={handleEditing} style={viewMode}>
        <input
          type="checkbox"
          className={styles.checkbox}
          checked={completed}
          onChange={() => props.handleChangeProps(id)}
          name="checkbox"
        />
        <button
          data-set="delete-todo-btn"
          onClick={() => props.deleteTodoProps(id)}
        >
          <FaTrash style={{ color: "orangered", fontSize: "16px" }} />
        </button>
        <span style={completed ? completedStyle : null}>{title} [{category}](<i>{priority}</i>)</span>
      </div>
      <div style={editMode}>
        <input
          type="text"
          className={styles.textInput}
          value={title}
          onChange={(e) => {
            props.setUpdate(e.target.value, category, priority, id);
          }}
          onKeyDown={handleUpdatedDone}
        />
        <input
          type="text"
          className={styles.categoryInput}
          value={category}
          onChange={(e) => {
            props.setUpdate(title, e.target.value, priority, id);
          }}
          onKeyDown={handleUpdatedDone}
        />
        <select
          value={priority}
          onChange={(e) => {
            props.setUpdate(title, category, e.target.value, id);
            setEditing(false);
          }}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
    </li>
  );
};

export default TodoItem;
