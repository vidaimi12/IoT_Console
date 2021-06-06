import express, {
    Request,
    Response
} from "express"

function publicResponse(req: Request, res: Response) {
    res.json({
        "Server": "iotconsolebackend",
        "Version": "1.0",
        "Made by:": "Imre Vida"
    });
    res.status(200).end();
}
export default publicResponse;