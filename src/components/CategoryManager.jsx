/* eslint react/prop-types: 0 */
import { useState } from "react";
import styles from './CategoryManager.module.css';

const CategoryManager = ({ categories, addCategory, updateCategory, deleteCategory }) => {
    const [newCategory, setNewCategory] = useState("");

    const handleAddCategory = (e) => {
        e.preventDefault();
        if (newCategory.trim()) {
        addCategory(newCategory);
        setNewCategory("");
        }
    };

    return (
        <div className={styles['category-manager']}>
        <h2>Manage Categories</h2>
        <form onSubmit={handleAddCategory}>
            <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="New category"
            />
            <button type="submit">Add</button>
        </form>
        <ul>
            {categories.map((category) => (
            <li key={category.id}>
                <input
                type="text"
                value={category.name}
                onChange={(e) => updateCategory(category.id, e.target.value)}
                />
                <button onClick={() => deleteCategory(category.id)}>Delete</button>
            </li>
            ))}
        </ul>
        </div>
    );
};

export default CategoryManager;
