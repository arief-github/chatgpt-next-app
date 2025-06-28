'use server';
import fs from 'node:fs/promises'
import { revalidateTag, unstable_cache } from "next/cache";

export interface Todo {
    id: string;
    title: string;
    completed: boolean;
}

export async function getTodosFromServer() {
    const files = await fs.readFile("todos.json", "utf-8")
    return JSON.parse(files.toString()) as Todo[];
}

export const getTodos = unstable_cache(
    getTodosFromServer,
    ['todo-list'],
    {
        tags: ['todos']
    }
)

export async function addTodo(title: string) {
    const todos = await getTodos()
    const newTodo = {
        id: Math.random().toString(36).substring(7),
        title,
        completed: false
    }
    todos.push(newTodo)
    await fs.writeFile("todos.json", JSON.stringify(todos, null, 2))

    revalidateTag('todos')
}