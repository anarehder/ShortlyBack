import { db } from "../database/database.connection.js"
import bcrypt from "bcrypt";

export async function signup(req, res) {
    const { name, email, password } = req.body

    try {
        console.log(req.body);
        const hash = bcrypt.hashSync(password, 10);

        await db.query(
            `INSERT INTO users (name, email, password) VALUES ($1, $2, $3);`
            , [name, email, hash]);

        res.status(201).send("Funcionou");

    } catch (err) {
        res.status(500).send(err.message);
    }
}