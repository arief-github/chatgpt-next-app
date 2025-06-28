"use client";

import { Todo, addTodo } from '../todos'
import {useState} from "react";

export default function Todos({ todos }: { todos: Todo[], addNewTodo: (title: string) => Promise<void> }) {
    const [newTodo, setNewTodo] = useState<string>("");

    return (
        <>
            <h2 className='text-2xl font-bold mb-5'>Todos</h2>
            <ul>
                {
                    todos.map((todo) => (
                        <li key={todo.id}>
                            { todo.title }
                        </li>
                    ))
                }
            </ul>
            <form onSubmit={async (e) => {
                e.preventDefault()
                await addTodo(newTodo)
                setNewTodo("")
            }}>
                <input
                    type='text'
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    className='border p-1 text-black'
                />
                <button type="submit" className="border p-1">
                    Add
                </button>
            </form>
        </>
    )
}