import React, { useState } from "react";
import ListItems from "./ToDoItem";
import InputArea from "./InputField";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

function List() {
    const [items, setItems] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentItem, setCurrentItem] = useState({ id: null, text: "", category: "" });

    function addItem(inputValue, category) {
        setItems((prevItems) => {
            return [...prevItems, { text: inputValue, category }];
        });
    }

    function deleteItem(id) {
        setItems((prevItems) => {
            return prevItems.filter((item, index) => index !== id);
        });
    }

    function editItem(id) {
        const itemToEdit = items.find((item, index) => index === id);
        setIsEditing(true);
        setCurrentItem({ id, text: itemToEdit.text, category: itemToEdit.category });
    }

    function updateItem(newText, newCategory) {
        setItems((prevItems) => {
            return prevItems.map((item, index) => {
                if (index === currentItem.id) {
                    return { text: newText, category: newCategory };
                }
                return item;
            });
        });
        setIsEditing(false);
        setCurrentItem({ id: null, text: "", category: "" });
    }

    function getItemsByCategory(category) {
        return category ? items.filter(item => item.category === category) : items;
    }

    return (
        <Router>
            <div className="bg-black ml-[4rem] bg-opacity-20  backdrop-blur-lg p-10 w-full max-w-md  rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out">
                <h1 className="text-4xl font-extrabold text-center mb-5 text-white drop-shadow-lg">To-do List App</h1>

                <InputArea 
                onAdd={addItem}
                onUpdate={updateItem}
                isEditing={isEditing}
                currentItem={currentItem} />

                <nav className="mb-4">
                    <Link className="mr-4 text-white font-bold hover:text-purple-800" to="/">All</Link>
                    <Link className="mr-4 text-white font-bold hover:text-purple-800" to="/work">Work</Link>
                    <Link className="mr-4 text-white font-bold hover:text-purple-800" to="/personal">Personal</Link>
                </nav>

                <Routes>
                    <Route path="/work" element={<TaskList items={getItemsByCategory("work")} onChecked={deleteItem} onEdit={editItem} />} />
                    <Route path="/personal" element={<TaskList items={getItemsByCategory("personal")} onChecked={deleteItem} onEdit={editItem} />} />
                    <Route path="/" element={<TaskList items={getItemsByCategory()} onChecked={deleteItem} onEdit={editItem} />} />
                </Routes>
            </div>
        </Router>
    );
}

function TaskList({ items, onChecked, onEdit }) {
    return (
        <ul className="list-disc pl-5">
            {items.map((toDoItem, index) => (
                <ListItems
                    key={index}
                    id={index}
                    text={toDoItem.text}
                    category={toDoItem.category}
                    onChecked={onChecked}
                    onEdit={onEdit}
                />
            ))}
        </ul>
    );
}

export default List;
