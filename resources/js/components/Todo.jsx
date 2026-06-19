// src/components/Todo.jsx

import { useState } from "react";

import {
    useSelector,
    useDispatch
} from "react-redux";

import {
    addTodo,
    removeTodo
} from "../store/todoSlice";

function Todo() {

    const [text, setText] = useState("");

    const dispatch = useDispatch();

    const todos = useSelector(
        state => state.todo.todos
    );

    const handleAdd = () => {

        if (!text.trim()) return;

        dispatch(addTodo({
            id: Date.now(),
            text: text,
            completed: false,
        }));

        setText("");

    };

    return (

        <div>

            <input
                value={text}
                className="border border-gray-500 rounded-[5px] outline-none mr-5 p-2 text-[14px]"
                onChange={(e) =>
                    setText(e.target.value)
                }
            />

            <button onClick={handleAdd} className="bg-green-600 text-white border rounded-[4px] p-[5px_5px]">
                Add Todo
            </button>

            <ul className="pt-2 flex flex-col">

                {
                    todos.map(todo => (

                        <li key={todo.id} className="border-b border-white w-full inline-flex items-center justify-between p-5 bg-amber-300 text-black">

                            {todo.text}

                            <button
                                className="bg-red-600 text-white border rounded-[4px] p-[5px_5px]"
                                onClick={() =>
                                    dispatch(
                                        removeTodo(
                                            todo.id
                                        )
                                    )
                                }
                            >
                                Delete
                            </button>

                        </li>

                    ))
                }

            </ul>

        </div>

    );

}

export default Todo;