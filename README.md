# Example Notes App

This is a simple CRUD REST API written in NodeJS using Express and typescript.

## Endpoints

The existing endpoints are the following:

Get all notes `GET /api/v1/notes`

Get note by id  `GET /api/v1/notes/:id`

Create new note `POST /api/v1/notes`
with the payload below:

```
{
    content: string,
    user_id: number,
    date: string
}
```


Delete note by id `DELETE /api/v1/notes/:id`

## Running the applications

To run the application run the following commands:

```
npm install
npm run start
```

The application will run by default on port 3000 and is reachable on `http://localhost.com:3000`.


## Database

To simplify the application there is no actual database. Everything is held in a json file and a mock ORM is used to work with the data.


## Running tests

Tests can be run with the following command:
``` 
npm run test
```
