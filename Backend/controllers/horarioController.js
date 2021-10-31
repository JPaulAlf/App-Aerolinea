const HorarioModel = require("../models/Horario");
const RutaModel = require("../models/Ruta");
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



var {horarios} = await RutaModel.findById(req.params.id).populate("horarios").exec();

for (const element of horarios) {
  var horarioDB = await HorarioModel.findByIdAndRemove(element._id);
}
  
    

  

  // si post es null significa que no existe el registro
 return next();
 
};

module.exports.update = async (req, res, next) => {

//borrar



 
//crear
  var horarios_id=[];
  


for (const element of req.body.horarios) {

    const { fecha, hora_sal } = element;
    const horario = await new HorarioModel({ 
      fecha, hora_sal });
   await horario.save();
      horarios_id.push(horario._id);

    
  }
  





req.horarios_id = horarios_id;
  
  return next();
};