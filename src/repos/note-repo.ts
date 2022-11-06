import { Note } from "../models/Note";
import { DB, IDBNote, ORM } from "./mock-orm";

const orm = new ORM();

export class NoteRepo {
    private static createNotes(db: DB): Note[] {
        return db.notes.map(note => new Note(note.content, note.user_id, note.date, note.id))
    }

    private static notesToDBNOtes(notes: Note[]): IDBNote[] {
        return notes.map(note => { return { content: note.content, date: note.date.toISOString(), user_id: note.user_id, id: note.id } });
    }

    static async getAll(): Promise<Note[]> {
        const db: DB = await orm.openDB();
        return this.createNotes(db);
    }

    static async getById(id: number): Promise<Note | null> {
        const db = await orm.openDB();
        const notes = this.createNotes(db).filter(note => note.id === id);

        if (notes.length === 0) {
            return null;
        }

        return notes[0]
    }

    static async add(content: string, user_id: number, date: string): Promise<Note> {
        const db = await orm.openDB()
        let notes: Note[] = this.createNotes(db)
        const newNote = new Note(content, user_id, date);
        let dbnotes: IDBNote[] = this.notesToDBNOtes([...notes, newNote])
        await orm.writeDB({ notes: dbnotes });

        return newNote;
    }

    static async delete(id: number): Promise<Note | null> {
        const db = await orm.openDB();
        let notes = this.createNotes(db)
        const noteMatch: Note[] = notes.filter(note => note.id === id);

        if (noteMatch.length === 0) return null

        notes = notes.filter(note => note.id !== id);
        await orm.writeDB({ notes: this.notesToDBNOtes(notes) });

        return noteMatch[0];
    }
}