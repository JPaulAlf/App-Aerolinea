const PostModel = require("../models/Vuelo");


module.exports.get = async (req, res, next) => {
    const posts = await PostModel.find().populate("Vuelo", "avion_id ruta_id hora_sal hora_lleg").exec();
    res.json(posts);
};

module.exports.getById = async (req, res, next) => {
  const id = req.params.id;
  const post = await PostModel.findOne({ _id: id }).exec();
  res.json(post);
};

module.exports.create = (req, res, next) => {
  const {avion_id, ruta_id, hora_sal, hora_lleg } = req.body;
  const post = new PostModel({ avion_id: avion_id, ruta_id: ruta_id, hora_sal: hora_sal,hora_lleg: hora_lleg  });
  post.save();
  res.json(post);
};

module.exports.delete = async (req, res, next) => {
  const post = await PostModel.findByIdAndRemove(req.params.id);
  // si post es null significa que no existe el registro
  if (post) {
    res.json({ result: "Flight deleted", post });
  } else {
    res.json({ result: "Invalid Id", post });
  }
};

module.exports.update = async (req, res, next) => {
  const {avion_id, ruta_id, hora_sal, hora_lleg } = req.body;
  const post = await PostModel.findOneAndUpdate(
    { _id: req.params.id },
    { avion_id, ruta_id, hora_sal, hora_lleg }, 
    { new: true } // retornar el registro que hemos modificado con los nuevos valores
  );
  res.json(post);
};