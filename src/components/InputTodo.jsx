/* eslint react/prop-types: 0 */
import { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";

const InputTodo = (props) => {
  const [inputText, setInputText] = useState({
    title: "",
    category: "",
    priority: "LOW", // Default priority
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
      props.addTodoProps(inputText.title, inputText.category, inputText.priority);
      setInputText({
        title: "",
        category: "",
        priority: "LOW", // Reset priority to default
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
      <input
        type="text"
        className="category-text"
        placeholder="Category"
        value={inputText.category}
        name="category"
        onChange={onChange}
      />
      <select
        name="priority"
        value={inputText.priority}
        onChange={onChange}
       >
        <option value="LOW">Low</option>
        <option value="MEDIUM">Medium</option>
        <option value="HIGH">High</option>
      </select>
      <button data-set="add-todo-btn" className="input-submit">
        <FaPlusCircle />
      </button>
    </form>
  );
};

export default InputTodo;
