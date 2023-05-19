import { db } from "../database/database.connection.js"

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