"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import NoteFormCard from "@/app/components/NoteFormCard";
import NoteCard from "@/app/components/NoteCard";

import {
    handleNote,
    getNotes,
    deleteNote,
    getNotesByTag,
    NoteInput,
} from "@/app/server-actions/notesAction";

type Note = {
    id: string;
    title: string;
    content: string;
    tag: string;
};

type FormData = {
    title: string;
    content: string;
    tag: string;
};

export default function NotesApp() {
    const [notes, setNotes] = useState<Note[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [activeTag, setActiveTag] = useState<string>("");

    const form = useForm<FormData>({
        defaultValues: { title: "", content: "", tag: "" },
    });

    const { control, handleSubmit, reset, setValue, formState } = form;

    useEffect(() => {
        getNotes().then(setNotes);
    }, []);

    const onSubmit = async (data: FormData) => {
        const input: NoteInput = editingId
            ? { action: "update", id: editingId, ...data }
            : { action: "create", ...data };

        const updated = await handleNote(input);
        setNotes(updated);
        setEditingId(null);
        reset(); // clear form
    };

    const handleEdit = (note: Note) => {
        setEditingId(note.id);
        setValue("title", note.title);
        setValue("content", note.content);
        setValue("tag", note.tag);
    };

    const handleDelete = async (id: string) => {
        const updated = await deleteNote(id);
        setNotes(updated);
    };

    const handleFilter = async (tag: string) => {
        if (tag === "") {
            const all = await getNotes();
            setNotes(all);
            setActiveTag("");
        } else {
            const filtered = await getNotesByTag(tag);
            setNotes(filtered);
            setActiveTag(tag);
        }
    };

    const allTags = Array.from(new Set(notes.map((n) => n.tag).filter(Boolean)));

    return (
        <div className="max-w-2xl mx-auto py-10 space-y-6">
            <NoteFormCard
                onSubmit={handleSubmit(onSubmit)}
                control={control}
                errors={formState.errors}
                editingId={editingId}
            />

            <div className="flex flex-wrap gap-2">
                <Button
                    variant={activeTag === "" ? "default" : "outline"}
                    onClick={() => handleFilter("")}
                >
                    All
                </Button>
                {allTags.map((tag) => (
                    <Button
                        key={tag}
                        variant={activeTag === tag ? "default" : "outline"}
                        onClick={() => handleFilter(tag)}
                    >
                        #{tag}
                    </Button>
                ))}
            </div>

            <div className="grid gap-4">
                {notes.map((note) => (
                    <NoteCard
                        key={note.id}
                        note={note}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                ))}
            </div>
        </div>
    );
}
