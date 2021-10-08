const mongoose = require('mongoose');

const Aeropuerto = mongoose.model(
    "Aeropuerto", 
    new mongoose.Schema({
        nombre:String,
        pais:String,
        ciudad:String,
        latitud:Number,
        longitud:Number 
    })
);

module.exports = Aeropuerto;

