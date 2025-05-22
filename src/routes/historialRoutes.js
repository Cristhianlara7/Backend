const express = require('express');
const router = express.Router();
const historialController = require('../controllers/historialController');
const auth = require('../middleware/auth');
const verificarRol = require('../middleware/verificarRol');

// Rutas protegidas (requieren autenticación)
router.get('/', auth, historialController.getAll);
router.get('/equipo/:equipoId', auth, historialController.getByEquipo);
router.post('/', auth, verificarRol(['administrador']), historialController.create);

module.exports = router;