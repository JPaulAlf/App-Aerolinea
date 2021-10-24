const HorarioModel = require("../models/Horario");

module.exports.get = async (req, res, next) => {
  const horarios = await HorarioModel.find().populate("Horario", "fecha hora_sal").exec();
  res.json(horarios);
};

module.exports.getById = async (req, res, next) => {
  const id = req.params.id;
  const horario = await HorarioModel.findOne({ _id: id }).exec();
  res.json(horario);
};

module.exports.create = (req, res, next) => {
  const { fecha, hora_sal } = req.body;
  const horario = new HorarioModel({ fecha: fecha, hora_sal: hora_sal });
  horario.save();
  res.json(horario);
};

module.exports.delete = async (req, res, next) => {
  const horario = await HorarioModel.findByIdAndRemove(req.params.id);
  // si post es null significa que no existe el registro
  if (horario) {
    res.json({ result: "Schedule deleted", horario });
  } else {
    res.json({ result: "Invalid Id", horario });
  }
};

module.exports.update = async (req, res, next) => {
  const { fecha, hora_sal } = req.body;
  const horario = await HorarioModel.findOneAndUpdate(
    { _id: req.params.id },
    { fecha, hora_sal },
    { new: true } // retornar el registro que hemos modificado con los nuevos valores
  );
  res.json(horario);
};