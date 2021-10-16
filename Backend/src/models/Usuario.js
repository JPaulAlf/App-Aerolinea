const mongoose = require('mongoose');

const Usuario = mongoose.model(
    "Usuario", 
    new mongoose.Schema({ 
        rol: {
            type: Number,
          },
          usuario: {
            type: String,
          },
          pwd: {
            type: String,
          },
          nombre: {
            type: String,
          },
          apellidos: {
            type: String,
          },
          correo: {
            type: String,
          },
          fech_nacimiento: {
            type: Date,
            default: Date.now,
          },
          tel_trabajo: {
            type: String,
          },
          tel_celular: {
            type: String,
          },
          estado: {
            type: Number
          },
          direccion: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Direccion'
          }
    })
);

module.exports = Usuario;