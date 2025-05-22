const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const authMiddleware = require('../middleware/auth');
const verificarRol = require('../middleware/verificarRol');

// Rutas públicas
router.post('/login', usuarioController.login);
// Rutas públicas
router.post('/register', usuarioController.create);

// Rutas protegidas
router.get('/', authMiddleware, verificarRol(['administrador']), usuarioController.getAll);
router.get('/:id', authMiddleware, usuarioController.getById);
router.put('/:id', authMiddleware, usuarioController.update);
router.delete('/:id', authMiddleware, verificarRol(['administrador']), usuarioController.delete);

// Ruta para cambiar contraseña - asegurarse de que esté antes de las rutas con parámetros
router.post('/cambiar-password', authMiddleware, usuarioController.cambiarPassword);

module.exports = router;