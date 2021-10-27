const express = require("express");
const router = express.Router();
const vueloController = require("../controllers/vueloController");

//Autenticación para el uso del API
const auth = require("../middleware/auth");
const { permit } = require("../middleware/authorization");

//Definición de rutas para cada uno de los verbos para los post
router.get("/flight/overview-flight", vueloController.get);

router.get("/flight/edit-flight/:id", auth, vueloController.getById);

router.post("/flight/add-flight", auth, permit(1), vueloController.create);

router.delete("/flight/edit-flight/:id", auth, permit(1), vueloController.delete);

router.put("/flight/edit-flight/:id", auth, permit(1), vueloController.update);

module.exports = router;
