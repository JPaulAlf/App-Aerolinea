const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { permit } = require("../middleware/authorization");
const rutaController = require("../controllers/rutaController");



router.get("/", rutaController.get);

router.get("/:id", rutaController.getById);

router.post("/create/", rutaController.create);

router.delete("/delete/:id", rutaController.delete);

// actualizar registro
router.put("/update/:id", rutaController.update);

module.exports = router;
