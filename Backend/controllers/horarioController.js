const PostModel = require("../models/Horario");


module.exports.get = async (req, res, next) => {
    const posts = await PostModel.find().populate("Horario", "fecha hora_sal").exec();
    res.json(posts);
};

module.exports.getById = async (req, res, next) => {
  const id = req.params.id;
  const post = await PostModel.findOne({ _id: id }).exec();
  res.json(post);
};

module.exports.create = (req, res, next) => {
  const {fecha, hora_sal } = req.body;
  const post = new PostModel({ fecha:fecha, hora_sal:hora_sal });
  post.save();
  res.json(post);
};

module.exports.delete = async (req, res, next) => {
  const post = await PostModel.findByIdAndRemove(req.params.id);
  // si post es null significa que no existe el registro
  if (post) {
    res.json({ result: "Schedule deleted", post });
  } else {
    res.json({ result: "Invalid Id", post });
  }
};

module.exports.update = async (req, res, next) => {
    const {fecha, hora_sal } = req.body;
    const post = await PostModel.findOneAndUpdate(
    { _id: req.params.id },
    { fecha, hora_sal }, 
    { new: true } // retornar el registro que hemos modificado con los nuevos valores
  );
  res.json(post);
};