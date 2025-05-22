const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.error('Error conectando a MongoDB:', err));

// Rutas
const usuarioRoutes = require('./routes/usuarioRoutes');
const equipoRoutes = require('./routes/equipoRoutes');
const reporteRoutes = require('./routes/reporteRoutes');
const historialRoutes = require('./routes/historialRoutes');
const tipoEquipoRoutes = require('./routes/tipoEquipoRoutes');
const alertaRoutes = require('./routes/alertaRoutes');
const empleadosRoutes = require('./routes/empleadosRoutes');  // Corregida la extensión del archivo

app.use('/api/reportes', reporteRoutes);
app.use('/api/tipos-equipo', tipoEquipoRoutes);
app.use('/api/alertas', alertaRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/equipos', equipoRoutes);
app.use('/api/historial', historialRoutes);
app.use('/api/empleados', empleadosRoutes);

// Puerto y conexión
const PORT = process.env.PORT || 3001; // Cambiado a 3001 como alternativa
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});