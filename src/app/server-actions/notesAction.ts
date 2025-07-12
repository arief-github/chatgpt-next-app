// app/actions/noteActions.ts or wherever your server actions live

"use server"

import prisma from "@/lib/prisma" // assumes you have lib/prisma.ts

export type Note = {
    id: string
    title: string
    content: string
    tag: string
}

export type NoteInput =
    | {
    action: 'create'
    title: string
    content: string
    tag?: string
}
    | {
    action: 'update'
    id: string
    title?: string
    content?: string
    tag?: string
}

export async function handleNote(input: NoteInput): Promise<Note[]> {
    if (input.action === "create") {
        await prisma.note.create({
            data: {
                title: input.title,
                content: input.content,
                tag: input.tag ?? "",
            },
        })
    }

    if (input.action === "update") {
        await prisma.note.update({
            where: { id: input.id },
            data: {
                title: input.title,
                content: input.content,
                tag: input.tag,
            },
        })
    }

    return await prisma.note.findMany()
}

export async function getNotes(): Promise<Note[]> {
    return await prisma.note.findMany()
}

export async function deleteNote(id: string): Promise<Note[]> {
    await prisma.note.delete({ where: { id } })
    return await prisma.note.findMany()
}

export async function getNotesByTag(tag: string): Promise<Note[]> {
    return await prisma.note.findMany({
        where: {
            tag: {
                equals: tag,
                mode: 'insensitive', // case-insensitive matching
            },
        },
    })
}
