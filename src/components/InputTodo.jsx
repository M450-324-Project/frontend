/* eslint react/prop-types: 0 */
import { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";

const InputTodo = (props) => {
  const [inputText, setInputText] = useState({
    title: "",
    priority: "low", // Default priority
  });

  const onChange = (e) => {
    setInputText({
      ...inputText,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.title.trim()) {
      props.addTodoProps(inputText.title, inputText.priority);
      setInputText({
        title: "",
        priority: "low", // Reset priority to default
      });
    } else {
      alert("Please write an item");
    }
  };

  return (
    <form
      data-set="todo-form"
      onSubmit={handleSubmit}
      className="form-container"
    >
      <input
        type="text"
        className="input-text"
        placeholder="Add todo..."
        value={inputText.title}
        name="title"
        onChange={onChange}
      />
      <select
        name="priority"
        value={inputText.priority}
        onChange={onChange}
       >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button data-set="add-todo-btn" className="input-submit">
        <FaPlusCircle />
      </button>
    </form>
  );
};

export default InputTodo;
