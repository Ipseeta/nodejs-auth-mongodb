const conn = require('../mongodb');
const dbConfig = require('../config/db.config');

checkDuplicateUsername = async (req, res, next) => {
    const client = await conn.getConnection();
    const db = client.db(`${dbConfig.DB}`);
    db.collection(`${dbConfig.USER}`).find({ username: req.body.username }).toArray((err, user) => {
        if (err) return res.status(500).send({ message: err });
        if (user[0]) {
            return res.status(400).send({ message: `Username ${user[0].username} already exists` });
        }
        next();
    });
};

const verifySignUp = {
    checkDuplicateUsername
};

module.exports = verifySignUp;