const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const usuarioController = {
    // Login de usuario
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const usuario = await Usuario.findOne({ email });
            
            if (!usuario) {
                return res.status(401).json({ message: 'Credenciales inválidas' });
            }

            const isMatch = await usuario.comparePassword(password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Credenciales inválidas' });
            }

            const token = jwt.sign(
                { id: usuario._id },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );

            res.json({
                token,
                usuario: {
                    id: usuario._id,
                    nombre: usuario.nombre,
                    email: usuario.email,
                    rol: usuario.rol
                }
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Obtener todos los usuarios
    getAll: async (req, res) => {
        try {
            const usuarios = await Usuario.find().select('-password');
            res.json(usuarios);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Obtener un usuario por ID
    getById: async (req, res) => {
        try {
            const usuario = await Usuario.findById(req.params.id).select('-password');
            if (!usuario) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }
            res.json(usuario);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Crear nuevo usuario
    create: async (req, res) => {
        try {
            const usuario = new Usuario(req.body);
            const nuevoUsuario = await usuario.save();
            res.status(201).json({
                id: nuevoUsuario._id,
                nombre: nuevoUsuario.nombre,
                email: nuevoUsuario.email,
                rol: nuevoUsuario.rol
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // Actualizar usuario
    update: async (req, res) => {
        try {
            const usuario = await Usuario.findById(req.params.id);
            if (!usuario) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            // Actualizar campos básicos
            if (req.body.nombre) usuario.nombre = req.body.nombre;
            if (req.body.email) usuario.email = req.body.email;
            if (req.body.rol) usuario.rol = req.body.rol;

            // Si se proporciona una nueva contraseña, hashearla
            if (req.body.password) {
                usuario.password = req.body.password;
            }

            const usuarioActualizado = await usuario.save();
            res.json({
                id: usuarioActualizado._id,
                nombre: usuarioActualizado.nombre,
                email: usuarioActualizado.email,
                rol: usuarioActualizado.rol,
                redirect: '/usuarios' // Agregamos el campo redirect para indicar la redirección
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // Eliminar usuario
    delete: async (req, res) => {
        try {
            const usuario = await Usuario.findByIdAndDelete(req.params.id);
            if (!usuario) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }
            res.json({ message: 'Usuario eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    // Agregar el método cambiarPassword dentro del objeto usuarioController
    cambiarPassword: async (req, res) => {
        try {
            const { passwordActual, nuevaPassword } = req.body;
            const userId = req.usuario._id; // Obtenemos el ID del usuario autenticado

            const usuario = await Usuario.findById(userId);
            if (!usuario) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            const isMatch = await usuario.comparePassword(passwordActual);
            if (!isMatch) {
                return res.status(400).json({ message: 'La contraseña actual es incorrecta' });
            }

            usuario.password = nuevaPassword;
            await usuario.save();

            res.json({ message: 'Contraseña actualizada exitosamente' });
        } catch (error) {
            console.error('Error al cambiar la contraseña:', error);
            res.status(500).json({ message: 'Error al cambiar la contraseña' });
        }
    }
};

module.exports = usuarioController;