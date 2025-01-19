import React, { useState, useEffect } from "react";
import Header from "./Header";
import InputTodo from "./InputTodo";
import TodosList from "./TodosList";
import CategoryManager from "./CategoryManager";
import styles from "./TodoContainer.module.css";

const TodoContainer = () => {
  const [todos, setTodos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [mode, setMode] = useState("default");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    fetchTodos();
    fetchCategories();
  }, []);

  const fetchTodos = async () => {
    const response = await fetch("http://localhost:8080/api/task");
    const todos = await response.json();
    setTodos(todos);
  };

  const fetchCategories = async () => {
    const response = await fetch("http://localhost:8080/api/category");
    const categories = await response.json();
    setCategories(categories);
  };

  const fetchTodosByPriority = async () => {
    const response = await fetch("http://localhost:8080/api/task/sorted-by-priority");
    const todos = await response.json();
    setTodos(todos);
  };

  const fetchTodosByCategory = async (categoryId) => {
    if (!categoryId) {
      return fetchTodos();
    }
    const response = await fetch(`http://localhost:8080/api/task/category/${categoryId}`);
    const todos = await response.json();
    setTodos(todos);
  };

  const handleChange = async (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updatedTodos);

    const todoToUpdate = updatedTodos.find((todo) => todo.id === id);
    await fetch(`http://localhost:8080/api/task/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todoToUpdate),
    });
  };

  const delTodo = async (id) => {
    setTodos([...todos.filter((todo) => todo.id !== id)]);

    await fetch(`http://localhost:8080/api/task/${id}`, {
      method: "DELETE",
    });
  };

  const addTodoItem = async (name, categoryId, priority) => {
    const newTodo = {
      name,
      category: parseInt(categoryId),
      priority,
      completed: false,
    };

    const response = await fetch("http://localhost:8080/api/task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    });
    var addedTodo = await response.json();
    addedTodo.category = categories.find((category) => category.id === addedTodo.category.id);
    setTodos([...todos, addedTodo]);
  };

  const setUpdate = async (updatedName, updatedCategoryId, updatedPriority, id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.name = updatedName;
        todo.category = updatedCategoryId;
        todo.priority = updatedPriority;
      }
      return todo;
    });
    setTodos(todos.map((todo) => {
      if (todo.id === id) {
        todo.name = updatedName;
        todo.category = categories.find((category) => category.id === parseInt(updatedCategoryId));
        todo.priority = updatedPriority;
      }
      return todo;
    }));

    const todoToUpdate = updatedTodos.find((todo) => todo.id === id);
    await fetch(`http://localhost:8080/api/task/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todoToUpdate),
    });
  };

  const addCategory = async (name) => {
    const response = await fetch("http://localhost:8080/api/category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
    const newCategory = await response.json();
    setCategories([...categories, newCategory]);
  };

  const updateCategory = async (id, name) => {
    await fetch(`http://localhost:8080/api/category/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
    setCategories(
      categories.map((category) =>
        category.id === id ? { ...category, name } : category
      )
    );
  };

  const deleteCategory = async (id) => {
    await fetch(`http://localhost:8080/api/category/${id}`, {
      method: "DELETE",
    });
    setCategories(categories.filter((category) => category.id !== id));
  };

  const handleModeChange = (newMode, categoryId) => {
    setMode(newMode);
    if (newMode === "priority") {
      fetchTodosByPriority();
      setSelectedCategory("");
    } else if (newMode === "category") {
      fetchTodosByCategory(categoryId);
      if(categoryId) {
        setSelectedCategory(categories.find((category) => category.id === parseInt(categoryId)).name);
      } else {
        setSelectedCategory("");
      }
    } else {
      fetchTodos();
      setSelectedCategory("");
    }
  };

  return (
    <div className={styles.inner}>
      <Header />
      <div className={styles.modeButtons}>
        <button onClick={() => handleModeChange("default")}>Default View</button>
        <button onClick={() => handleModeChange("priority")}>Sort by Priority</button>
        <select placeholder={selectedCategory} onChange={(e) => handleModeChange("category", e.target.value)}>
          <option value="">Category View</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id} name={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <InputTodo addTodoProps={addTodoItem} categories={categories} />
      <CategoryManager
        categories={categories}
        addCategory={addCategory}
        updateCategory={updateCategory}
        deleteCategory={deleteCategory}
      />
      <TodosList
        todos={todos}
        handleChangeProps={handleChange}
        deleteTodoProps={delTodo}
        setUpdate={setUpdate}
        categories={categories}
      />
    </div>
  );
};

export default TodoContainer;
