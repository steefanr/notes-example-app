import jsonfile from "jsonfile";
import { Note } from "../models/Note";

export interface IDBNote {
    content: string,
    user_id: number,
    date: string,
    id: number
}

export class DB {
    constructor(public notes: IDBNote[]) { }
}

const dbFile = "database.json";

export class ORM {

    public openDB(): Promise<DB> {
        return jsonfile.readFile(__dirname + '/' + dbFile);
    }

    public writeDB(db: DB): Promise<void> {
        return jsonfile.writeFile((__dirname + '/' + dbFile), db);
    }
}