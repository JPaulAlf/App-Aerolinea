const mongoose = require('mongoose');

<<<<<<< HEAD
const Aeropuerto = mongoose.model(
    "Aeropuerto", 
    new mongoose.Schema({ 
        avion_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Avion',
          },
          ruta_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Ruta',
          },
          hora_sal: {
            type: String,
          },
          hora_lleg: {
            type: String,
          }
    })
);

module.exports = Aeropuerto;
=======
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
>>>>>>> fdb151b6683a48baf3d15a2e97d8f5f900af0848
