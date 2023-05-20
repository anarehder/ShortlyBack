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

export async function getLink(req,res){
    const { id } = req.params
    try{
        const response  = await db.query(
            `SELECT * FROM shortlinks WHERE id = $1`,[id]
        );
        if (response.rowCount === 0) return res.status(404).send("Url não encontrada");
        const formatedResponse = {
            "id": response.rows[0].id,
            "shortUrl": response.rows[0].shortUrl,
            "url": response.rows[0].url
        }
        res.status(200).send(formatedResponse);
    } catch (err){
        res.status(500).send(err.message); 
    }
}