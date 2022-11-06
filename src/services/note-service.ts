import { Note } from "@src/models/Note";
import { NoteRepo } from "@src/repos/note-repo";


export class NotesService {
    static deleteById(id: number): Promise<Note | null> {
        return NoteRepo.delete(id)
    }
    static addNote(content: string, user_id: number, date: string): Promise<Note> {
        return NoteRepo.add(content, user_id, date);
    }
    static getAll(): Promise<Note[]> {
        return NoteRepo.getAll();
    }

    static getById(id: number): Promise<Note | null> {
        return NoteRepo.getById(id);
    }
}
