import React from "react";
import '@fortawesome/fontawesome-free/css/all.css';

function ListItems(props) {
    return (
        <div className="flex justify-between">
            <li className="text-white text-lg font-medium mb-2">
                {props.text} - <span className="italic">{props.category}</span>
            </li>

            <div className="flex justify-between items-center gap-5 ">

                <div
                    className="text-purple-600 cursor-pointer"
                    onClick={() => props.onEdit(props.id)}
                >
                    <i className="fas fa-edit text-2xl"></i>
                </div>

                <div
                    className="text-red-500 cursor-pointer"
                    onClick={() => props.onChecked(props.id)}
                >
                    <i className="fas fa-times text-3xl"></i>
                </div>
            </div>
        </div>
    );
}

export default ListItems;
