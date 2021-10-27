const VueloModel = require("../models/Vuelo");

module.exports.get = async (req, res, next) => {
  const vuelos = await VueloModel.find().populate("Vuelo", "avion_id ruta_id hora_sal hora_lleg").exec();
  res.json(vuelos);
};

module.exports.getById = async (req, res, next) => {
  const id = req.params.id;
  const vuelo = await VueloModel.findOne({ _id: id }).populate("Vuelo", "avion_id ruta_id hora_sal hora_lleg").exec();
  res.json(vuelo);
};

module.exports.create = (req, res, next) => {
  const { avion_id, ruta_id, hora_sal, hora_lleg } = req.body;
  const vuelo = new VueloModel({ avion_id: avion_id, ruta_id: ruta_id, hora_sal: hora_sal, hora_lleg: hora_lleg });
  vuelo.save();
  res.json(vuelo);
};

module.exports.delete = async (req, res, next) => {
  const vuelo = await VueloModel.findByIdAndRemove(req.params.id);
  // si vuelo es null significa que no existe el registro
  if (vuelo) {
    res.json({ result: "Flight deleted", vuelo });
  } else {
    res.json({ result: "Invalid Id", vuelo });
  }
};

module.exports.update = async (req, res, next) => {
  const { avion_id, ruta_id, hora_sal, hora_lleg } = req.body;
  const vuelo = await VueloModel.findOneAndUpdate(
    { _id: req.params.id },
    { avion_id, ruta_id, hora_sal, hora_lleg },
    { new: true } // retornar el registro que hemos modificado con los nuevos valores
  );
  res.json(vuelo);
};
