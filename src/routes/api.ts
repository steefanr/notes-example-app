import { Router } from "express";

import { NotesRouter } from "./note-routes";

export const apiRouter = Router();

apiRouter.use(NotesRouter);
