const mongoose = require('mongoose');

const Rutas = mongoose.model(
    "Rutas", 
    new mongoose.Schema({ 
        Inicio: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Aeropuertos'
        },
        Destino:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Aeropuertos'
        },
        Duracion:Number,
        latitud_Inicio:Number,
        longitud_Inicio: Number,
        latitud_Final:Number,
        longitud_Final:Number
    })
);

module.exports = Rutas;