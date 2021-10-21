const express = require("express");
const router = express.Router();
const UserModel = require("../models/Usuario");
const userController = require("../controllers/usuarioController");

router.post("/", userController.signup);

router.get("/", userController.signin);

module.exports = router;
