"use client";
import React from  'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
    Control,
    FieldErrors,
    useController,
} from 'react-hook-form';

type FormData = {
    title: string
    content: string
    tag: string
}

type NoteFormCardProps = {
    onSubmit: () => void;
    control: Control<FormData>
    errors: FieldErrors<FormData>
    editingId: string | null
}

type InputField = {
    name: keyof FormData;
    control: Control<FormData>
    label: string;
    placeholder: string;
    errors: FieldErrors<FormData>
}

function InputField(props: InputField) {
    const { name,errors,label,placeholder,control  } = props

    const { field } = useController({
        name,
        control,
        defaultValue: "",
        rules: { required: `${label} is required` }
    })

    return (
        <div className='flex flex-col gap-1'>
            <label htmlFor={name} className='text-sm font-medium'>{label}</label>
            <input
                id={name}
                {...field}
                placeholder={placeholder}
                className='w-full rounded-md border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400'
            />
            {
                errors[name] && (
                    <span className='text-sm text-red-500'>
                        {(errors[name]?.message as string) || "This field is required"}
                    </span>
                )
            }
        </div>
    )
}

export default function NoteFormCard({
    onSubmit,
    editingId,
    control,
    errors
}: NoteFormCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{ editingId ? "Edit Note" : "Create Note" }</CardTitle>
                <CardContent>
                    <form onSubmit={onSubmit} className="space-y-4">
                            <InputField name='title' control={control} label="Title" placeholder="Enter Title" errors={errors}/>
                            <InputField name='content' control={control} label="Content" placeholder="Enter Content" errors={errors} />
                            <InputField name='tag' control={control} label="Tag" placeholder="Enter Tag" errors={errors} />
                            <Button type="submit">{editingId ? "Update Note" : "Add Note"}</Button>
                        </form>
                </CardContent>
            </CardHeader>
        </Card>
    )
}
