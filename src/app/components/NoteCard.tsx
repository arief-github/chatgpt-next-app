import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

type Note = {
    id: string
    title: string
    content: string
    tag: string
}

type NoteCardProps = {
    note: Note
    onEdit: (note: Note) => void
    onDelete: (id: string) => void
}

export default function NoteCard({ note, onDelete, onEdit }: NoteCardProps) {
    return (
        <Card className='relative'>
            <CardHeader>
                <CardTitle>{ note.title }</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="mb-2 text-gray-700">{note.content}</p>
                {note.tag && <span className="text-sm text-blue-600">#{note.tag}</span>}
                <div className="flex gap-2 mt-4">
                    <Button size="sm" onClick={() => onEdit(note)}>
                        Edit
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => onDelete(note.id)}>
                        Delete
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}