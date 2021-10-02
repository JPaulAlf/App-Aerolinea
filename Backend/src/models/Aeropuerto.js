const mongoose = require('mongoose');

const Aeropuertos = mongoose.model(
    "Aeropuertos", 
    new mongoose.Schema({
        nombre:String,
        pais:String,
        ciudad:String,
        latitud:Number,
        longitud:Number 
    })
);

module.exports = Aeropuertos;