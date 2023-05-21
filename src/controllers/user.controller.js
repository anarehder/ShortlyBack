import { db } from "../database/database.connection.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export async function signup(req, res) {
    const { name, email, password } = req.body;

    try {
        const hash = bcrypt.hashSync(password, 10);

        await db.query(
            `INSERT INTO users (name, email, password) VALUES ($1, $2, $3);`
            , [name, email, hash]
        );

        res.status(201);

    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function signin(req,res){

    try{
        const token = uuid();
        const response = {token};
        const userId = parseInt(res.locals.user.id);

        await db.query(
            `INSERT INTO sessions ("userId", token) VALUES ($1, $2);`
            , [userId, token]
        );

        res.status(200).send(response);
    } catch (err){
        res.status(500).send(err.message);
    }
}

export async function getMyLinks(req,res){
    try{
        const userId = res.locals.session;
        const { rows: userData } = await db.query(
            `SELECT SUM(shortlinks."visitCount") AS "visitCount", users.id, users.name
            FROM shortlinks
            JOIN users ON shortlinks."userId" = users.id
            WHERE users.id = $1
            GROUP BY users.id;`,
            [userId]
        );
        const { rows: links } = await db.query(
            `SELECT id, url, "shortUrl", "visitCount" FROM shortlinks WHERE "userId" = $1;`
            , [userId]
        );
        const response = {
           ...userData[0],
           "shortenedUrls": [...links]
        }
        res.status(200).send(response);
    } catch (err){
        res.status(500).send(err.message);
    }
}