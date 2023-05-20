import { db } from "../database/database.connection.js";

export async function validateUserLink(req, res, next) {
    const { id } = req.params;
    const userId = parseInt(res.locals.session);
    try {
        const response  = await db.query(
            `SELECT * FROM shortlinks WHERE id = $1`,[id]
        );
        if (response.rowCount === 0) return res.status(404).send({ message: "Url não encontrada" });
        const linkData = response.rows[0];
        if (linkData.userId !== userId) {
            return res.status(401).send({ message: "Este link não pertence ao seu usuário" });
        };
        next();
    } catch (err) {
        res.status(500).send(err.message);
    }
}