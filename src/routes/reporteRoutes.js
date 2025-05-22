const express = require('express');
const router = express.Router();
const reporteController = require('../controllers/reporteController');
const auth = require('../middleware/auth');
const verificarRol = require('../middleware/verificarRol');

router.get('/excel/inventario', auth, verificarRol(['administrador']), reporteController.generarReporteExcel);
router.get('/pdf/mantenimientos', auth, verificarRol(['administrador']), reporteController.generarReporteMantenimientosPDF);

module.exports = router;