import { db } from "../database/database.connection.js";
import bcrypt from "bcrypt";

export async function validateEmailAvailable(req, res, next) {
    const { email } = req.body;
    try {
        const user = await db.query(`SELECT * FROM users WHERE email=$1`, [email]);
        if (user.rowCount !== 0) return res.status(409).send({ message: "Esse e-mail já está cadastrado!" });
        next();
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function validatePassword(req, res, next) {
    const { password, confirmPassword } = req.body;

    if (password !== confirmPassword) return res.status(422).send({ message: "As senhas não coincidem" });
    next();
}

export async function validateEmailPassword(req, res, next){
    const { email, password } = req.body;
    try{
        const user = await db.query(`SELECT * FROM users WHERE email=$1`, [email]);
        if (user.rowCount === 0) return res.status(401).send({ message: "Esse e-mail não está cadastrado!" });
        const userPassword = user.rows[0].password;
        const checkPassword = bcrypt.compareSync(password, userPassword);
        if (!checkPassword) return res.status(401).send("Senha incorreta");
        res.locals.user = user.rows[0];
        next();
    }catch (err) {
        res.status(500).send(err.message);
    }
}