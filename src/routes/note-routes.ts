import { Router } from 'express';
import { Note } from "../models/Note";
import { Request, Response } from 'express'
import { NotesService } from '@src/services/note-service';
import HttpStatusCodes from '@src/configurations/HttpStatusCodes';

export const NotesRouter = Router();

NotesRouter.get('/notes', getAllNotes);
NotesRouter.get('/notes/:id', getNoteById);
NotesRouter.post('/notes', addNote);
NotesRouter.delete('/notes/:id', deleteNote);

interface INewNoteReq {
    content: string,
    user_id: number,
    date: string
}

async function getAllNotes(req: Request, res: Response) {
    const notes: Note[] = await NotesService.getAll();
    return res.status(HttpStatusCodes.OK).json({ notes });
}

async function getNoteById(req: Request, res: Response) {
    const id: number = +req.params.id;
    const note: Note | null = await NotesService.getById(id);

    if (note === null) {
        return res.status(HttpStatusCodes.BAD_REQUEST).json({ error: `There is no note with id ${id}` });
    }

    return res.status(HttpStatusCodes.OK).json({ note });
}

async function addNote(req: Request<INewNoteReq>, res: Response) {
    const content: string = req.body.content;
    const user_id: number = +req.body.user_id;
    const date: string = req.body.date;
    const note: Note = await NotesService.addNote(content, user_id, date);

    return res.status(HttpStatusCodes.OK).json({ note })
}


async function deleteNote(req: Request, res: Response) {
    const id: number = +req.params.id;
    const note: Note | null = await NotesService.deleteById(id);

    if (note === null) {
        return res.status(HttpStatusCodes.BAD_REQUEST).json({ error: `There is no note with id ${id}` });
    }

    return res.status(HttpStatusCodes.OK).json({ note });
}
