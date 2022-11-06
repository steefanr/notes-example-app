import express, { Express, Request, Response, NextFunction } from 'express';
import { apiRouter } from '@src/routes/api';
import logger from 'jet-logger';
import HttpStatusCodes from './configurations/HttpStatusCodes';
const app: Express = express();
app.use(express.json());
app.use('/api/v1', apiRouter);


app.use((
    err: Error,
    _: Request,
    res: Response,
    next: NextFunction,
) => {
    logger.err(err, true);
    let status = HttpStatusCodes.INTERNAL_SERVER_ERROR;
    return res.status(status).json({ error: err.message });
});





export default app

