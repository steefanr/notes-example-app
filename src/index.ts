import app from "./server";

const startServer = (port: number) => {
    try {
        app.listen(port, () => {
            console.log(`[Server]: Listening on port ${port}`);
        });
    } catch (err) {
        console.error(err);
    }
}

startServer(3000);


