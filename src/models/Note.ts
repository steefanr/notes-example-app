let lastId = 0;

export class Note {
    id: number;
    date: Date;

    constructor(public content: string, public user_id: number, date: string, id?: number) {
        this.date = new Date(Date.parse(date));
        this.id = id != undefined ? id : ++lastId;

        if (id && id > lastId) lastId = ++id;
    }
}

