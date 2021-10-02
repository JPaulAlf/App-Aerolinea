const mongoose = require('mongoose');

const Aviones = mongoose.model(
    "Aviones", 
    new mongoose.Schema({ 
        modelo: String,
        estado: {
            type: Number,
            default: 1,
        },
        anho: Number, 
        marca: String, 
        cantPas: Number,  
        cantFilas:Number,  
        cantAsintxFila: Number
    })
);

module.exports = Aviones;