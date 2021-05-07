const bcrypt = require('bcryptjs');
const dbConfig = require('../config/db.config');
const conn = require('../mongodb');

exports.signup = async (req, res) => {
    const client = await conn.getConnection();
    const db = client.db(`${dbConfig.DB}`);
    bcrypt.hash(req.body.password, 12)
        .then(function (hashedPass) {
            const user = {
                username: req.body.username,
                password: hashedPass
            }
            db.collection(`${dbConfig.USER}`).insertOne(user);
            res.send({ message: 'Registered user successfully!' });
        }).catch((err) => {
            return res.status(500).send({ message: err });
        });
}

exports.signin = async (req, res) => {
    const client = await conn.getConnection();
    const db = client.db(`${dbConfig.DB}`);
    db.collection(`${dbConfig.USER}`).find({ username: req.body.username }).toArray((err, user) => {
        if (err) return res.status(500).send({ message: err });
        if (!user[0]) return res.status(404).send({ message: 'User not found' });
        const isPassValid = bcrypt.compareSync(req.body.password, user[0].password);
        if (!isPassValid) return res.status(401).send({ message: 'Invalid Password!' });

        res.send({
            id: user[0]._id,
            username: user[0].username,
            message: 'Signed in successfully!'
        });
    });
}