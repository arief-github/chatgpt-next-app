"use client";

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from "react";
import { Note, NoteInput, handleNote, getNotes } from '@/app/server-actions/notesAction'

export default function NotesApp() {
    const [notes, setNotes] = useState<Note[]>([])
    const [title, setTitle] = useState<string>("")
    const [content, setContent] = useState<string>("")
    const [tag, setTag] = useState<string>("")
    const [editingId, setEditingId] = useState<string | null>(null)

    useEffect(() => {
        getNotes().then(setNotes)
    }, []);

    const onSave = async () => {
        const input: NoteInput = editingId ? { action: 'update', id: editingId, title, content, tag } : { action: 'create', title, content, tag }
        const updateNotes = await handleNote(input)

        setNotes(updateNotes)

        // Reset Form
        setTitle("")
        setContent("")
        setTag("")
        setEditingId(null)
    }

    const startEdit = (note: Note) => {
        setTitle(note.title)
        setContent(note.content)
        setTag(note.tag)
        setEditingId(note.id)
    }

    return (
        <div className='max-w-xl mx-auto py-8 space-y-6'>
            <div className='space-y-3'>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
                <Input value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content" />
                <Input value={tag} onChange={(e) => setTag(e.target.value)} placeholder="Tag" />
                <Button onClick={onSave}>
                    {editingId ? "Update Note" : "Create Note"}
                </Button>
            </div>
            <div className='space-y-4'>
                {notes.map((note) => (
                    <div key={note.id} className="p-4 border rounded shadow-sm">
                        <h2 className="font-bold">{note.title}</h2>
                        <p>{note.content}</p>
                        {note.tag && <span className="text-sm text-blue-600">#{note.tag}</span>}
                        <div className="mt-2 flex gap-2">
                            <Button size="sm" onClick={() => startEdit(note)}>Edit</Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}