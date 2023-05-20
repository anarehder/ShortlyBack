import { db } from "../database/database.connection.js"

export async function authValidation(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
    if (!token) return res.status(401).send("Header Inválido");
    try {
        const session = await db.query(`SELECT * FROM sessions WHERE token = $1`, [token]);
        if (session.rowCount === 0) return res.status(401).send("Inválido");

        res.locals.session = session.rows[0].userId;

        next()
    } catch (err) {
        res.status(500).send(err.message);
    }
}