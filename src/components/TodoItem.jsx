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

  const { completed, id, name, category, priority } = props.todo;

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
        <span style={completed ? completedStyle : null}>{name} [{category?.name}] (<i>{priority}</i>)</span>
      </div>
      <div style={editMode}>
        <input
          type="text"
          className={styles.textInput}
          value={name}
          onChange={(e) => {
            props.setUpdate(e.target.value, category?.id, priority, id);
          }}
          onKeyDown={handleUpdatedDone}
        />
        <select
          value={category?.id || ""}
          onChange={(e) => {
            props.setUpdate(name, e.target.value, priority, id);
          }}
          className={styles.categorySelect}
        >
          {props.categories && props.categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <select
          value={priority}
          onChange={(e) => {
            props.setUpdate(name, category?.id, e.target.value, id);
            setEditing(false);
          }}
        >
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>
      </div>
    </li>
  );
};

export default TodoItem;
