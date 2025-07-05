"use server";

import { v4 as uuid } from 'uuid'

export type Note = {
    id: string
    title: string
    content: string
    tag: string
}

let notes: Note[] = []

export type NoteInput =
    |{
        action: 'create'
        title: string
        content: string
        tag?: string
    }
    |{
        action: 'update'
        id: string,
        title?: string
        content?: string
        tag?: string
    }

export async function handleNote(input: NoteInput): Promise<Note[]> {
    if (input.action === 'create') {
        const newNote: Note = {
            id: uuid(),
            title: input.title,
            content: input.content,
            tag: input.tag ?? ''
        }

        notes.push(newNote)
    }

    if (input.action === 'update') {
        notes = notes.map(note => {
            if(note.id === input.id) {
                return {
                    ...note,
                    ...input
                }
            }

            return note
        })
    }

    return notes;
}

export async function getNotes(): Promise<Note[]> {
    return notes;
}

export async function deleteNote(id: string): Promise<Note[]> {
    notes = notes.filter(note => note.id !== id)
    return notes;
}

export async function getNotesByTag(tag: string): Promise<Note[]> {
    return notes.filter(note => note.tag.toLowerCase() === tag.toLowerCase())
}