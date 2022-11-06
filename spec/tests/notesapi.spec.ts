import supertest, { SuperTest, Test, Response } from "supertest";
import app from '../../src/server';
import logger from 'jet-logger';
import HttpStatusCodes from "../../src/configurations/HttpStatusCodes";
import { Note } from "@src/models/Note";
import { NoteRepo } from "@src/repos/note-repo";

interface INoteResponse {
    id: number,
    content: string,
    user_id: number,
    date: string
}


describe("Notes Route", () => {
    let agent: SuperTest<Test>;
    const allNotes: Note[] = [
        new Note("This is a note", 1, new Date().toISOString()),
        new Note("This is another note", 1, new Date().toISOString()),
        new Note("This is a note from another user", 1, new Date().toISOString())
    ]

    beforeAll((done) => {
        agent = supertest.agent(app);
        done();
    })

    describe(`"GET: /notes`, () => {
        it("successfully returns all notes", (done) => {
            const ret = Promise.resolve([...allNotes]);
            spyOn(NoteRepo, 'getAll').and.returnValue(ret);

            agent.get("/api/v1/notes").end((err: Error, res: Response) => {
                !!err && logger.err(err);
                expect(res.status).toBe(HttpStatusCodes.OK);
                const respNotes = res.body.notes;
                const retNotes = respNotes.map((note: INoteResponse) => new Note(note.content, note.user_id, note.date, note.id));
                expect(retNotes).toEqual(allNotes);
                expect(res.body.error).toBeUndefined();
                done();
            });
        })
    })

    describe("GET: /notes/:id", () => {
        const apiCall = (id: number) => {
            return agent.get(`/api/v1/notes/${id}`)
        }

        it("successfully retrieves a note by id", (done) => {
            const ret = Promise.resolve(allNotes[0]);
            spyOn(NoteRepo, 'getById').and.returnValue(ret);

            apiCall(allNotes[0].id).end((err: Error, res: Response) => {
                !!err && logger.err(err);
                expect(res.status).toBe(HttpStatusCodes.OK);
                const note = res.body.note;
                const retNote = new Note(note.content, note.user_id, note.date, note.id);
                expect(retNote).toEqual(allNotes[0]);
                expect(res.body.error).toBeUndefined();
                done();
            });
        })

        it("returns a 400 error if there is no note with that id", (done) => {
            spyOn(NoteRepo, 'getById').and.returnValue(Promise.resolve(null));
            const id = allNotes[allNotes.length - 1].id++;

            apiCall(id).end((err: Error, res: Response) => {
                !!err && logger.err(err);
                expect(res.status).toBe(HttpStatusCodes.BAD_REQUEST);
                expect(res.body.error).toBe(`There is no note with id ${id}`);
                done()
            })

        })
    })

    describe("POST: /notes", () => {
        const apiCall = () => {
            return agent.post(`/api/v1/notes`)
        }

        it("successfully adds a note", (done) => {
            const content: string = "This is a new note";
            const date: string = new Date().toISOString();
            const user_id: number = 1;
            const id: number = ++allNotes[allNotes.length - 1].id;

            const ret = Promise.resolve(new Note(content, user_id, date, id));
            spyOn(NoteRepo, 'add').and.returnValue(ret);

            apiCall().end((err: Error, res: Response) => {
                !!err && logger.err(err);
                expect(res.status).toBe(HttpStatusCodes.OK);
                const note = res.body.note;
                const retNote = new Note(note.content, note.user_id, note.date, note.id);
                expect(retNote).toEqual(new Note(content, user_id, date, id));
                expect(res.body.error).toBeUndefined();
                done();
            });
        })
    })


    describe("DELETE: /notes/:id", () => {
        const apiCall = (id: number) => {
            return agent.delete(`/api/v1/notes/${id}`)
        }

        it("successfully deletes a note by id", (done) => {
            const ret = Promise.resolve(allNotes[0]);
            spyOn(NoteRepo, 'delete').and.returnValue(ret);

            apiCall(allNotes[0].id).end((err: Error, res: Response) => {
                !!err && logger.err(err);
                expect(res.status).toBe(HttpStatusCodes.OK);
                const note = res.body.note;
                const retNote = new Note(note.content, note.user_id, note.date, note.id);
                expect(retNote).toEqual(allNotes[0]);
                expect(res.body.error).toBeUndefined();
                done();
            });
        })

        it("returns a 400 error if there is no note with that id", (done) => {
            spyOn(NoteRepo, 'delete').and.returnValue(Promise.resolve(null));
            const id = allNotes[allNotes.length - 1].id++;

            apiCall(id).end((err: Error, res: Response) => {
                !!err && logger.err(err);
                expect(res.status).toBe(HttpStatusCodes.BAD_REQUEST);
                expect(res.body.error).toBe(`There is no note with id ${id}`);
                done()
            })

        })
    })

})