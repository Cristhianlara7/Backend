const verificarRol = (rolesPermitidos) => {
    return (req, res, next) => {
        if (!req.usuario) {
            return res.status(403).json({ 
                message: 'No tienes permisos para realizar esta acción' 
            });
        }

        if (rolesPermitidos.includes(req.usuario.rol)) {
            next();
        } else {
            res.status(403).json({ 
                message: 'No tienes los permisos necesarios para esta acción' 
            });
        }
    };
};

module.exports = verificarRol;