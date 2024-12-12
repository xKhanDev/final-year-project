import express,{ Application, Request, Response } from 'express'

const app:Application = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/api/v1/auth", (req:Request, res:Response):any => {
    return res.send("Hello World!");
});

app.listen(PORT, () => {    
    console.log(`Server running on port ${PORT}`);
});