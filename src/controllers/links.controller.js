import { db } from "../database/database.connection.js";
import { nanoid } from "nanoid";

export async function createShortLink(req, res) {
    const { url } = req.body;
    try{
        const userId = res.locals.session;
        const shortLink = nanoid(8);
        const response = {"id": userId, "shortUrl": shortLink};

        await db.query(
            `INSERT INTO shortlinks (url, "shortUrl", "userId") VALUES ($1, $2, $3) RETURNING id`,
            [url, shortLink, userId]
        );
        res.status(201).send(response);
    } catch (err) {
        res.status(500).send(err.message);
    }
}