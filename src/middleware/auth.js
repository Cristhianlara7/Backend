const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const usuario = await Usuario.findById(decoded.id);

        if (!usuario) {
            throw new Error();
        }

        req.token = token;
        req.usuario = usuario;
        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            res.status(401).json({ message: 'Token inválido' });
        } else if (error.name === 'TokenExpiredError') {
            res.status(401).json({ message: 'Token expirado' });
        } else {
            res.status(401).json({ message: 'Por favor autentícate' });
        }
    }
};

module.exports = auth;