/* eslint react/prop-types: 0 */
import { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";

const InputTodo = (props) => {
  const [inputText, setInputText] = useState({
    name: "",
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
    if (inputText.name.trim()) {
      props.addTodoProps(inputText.name, inputText.category, inputText.priority);
      setInputText({
        name: "",
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
        value={inputText.name}
        name="name"
        onChange={onChange}
      />
      <select
        name="category"
        value={inputText.category}
        onChange={onChange}
        className="category-select"
      >
        <option value="">Select category</option>
        {props.categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
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
