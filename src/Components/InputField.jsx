import React, { useState, useEffect } from "react";

function InputArea(props) {
    const [inputValue, setInput] = useState("");
    const [category, setCategory] = useState("");

    useEffect(() => {
        if (props.isEditing) {
            setInput(props.currentItem.text);
            setCategory(props.currentItem.category);
        }
    }, [props.isEditing, props.currentItem]);

    function handleInputChange(event) {
        const newValue = event.target.value;
        setInput(newValue);
    }

    function handleCategoryChange(event) {
        const newCategory = event.target.value;
        setCategory(newCategory);
    }

    return (
        <div className="flex flex-col gap-5 items-center mb-5">
            <input
                className="flex-grow bg-white bg-opacity-20 backdrop-blur-lg border border-gray-300 rounded-lg p-2 text-white outline-none focus:ring-2 focus:ring-white placeholder-white"
                onChange={handleInputChange}
                type="text"
                value={inputValue}
                placeholder="Enter a task"
            />
            <input
                className="flex-grow bg-white bg-opacity-20 backdrop-blur-lg border border-gray-300 rounded-lg p-2 text-white outline-none focus:ring-2 focus:ring-white placeholder-white"
                onChange={handleCategoryChange}
                type="text"
                value={category}
                placeholder="Enter category"
            />
            <button
                className="bg-purple-500 text-white font-bold px-4 py-2 rounded-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                onClick={() => {
                    if (props.isEditing) {
                        props.onUpdate(inputValue, category);
                    } else {
                        props.onAdd(inputValue, category);
                    }
                    setInput("");
                    setCategory("");
                }}
            >
                {props.isEditing ? "Update" : "Add"}
            </button>
        </div>
    );
}

export default InputArea;
