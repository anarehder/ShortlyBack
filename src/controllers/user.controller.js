import { db } from "../database/database.connection.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export async function signup(req, res) {
    const { name, email, password } = req.body

    try {
        console.log(req.body);
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