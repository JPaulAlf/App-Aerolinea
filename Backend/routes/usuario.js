const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { permit } = require("../middleware/authorization");
const userController = require("../controllers/usuarioController");

router.post("/", userController.signup);

router.get("/", userController.signin);


// router.post('/create-client/',permit(1), userController.create);
// router.get('/get/',auth,permit(1), userController.get);
// router.put('/update-profile/:id',auth,permit(0), userController.update);
// router.put('/update-client/:id',auth,permit(1), userController.update);
// router.get('/get/:id',auth,permit(1,0), userController.getById);
// router.delete('/delete-profile/:id',auth,permit(0), userController.delete);
// router.delete('/delete-client/:id',auth,permit(1), userController.delete);
// module.exports = router;
router.post('/create-client/', userController.create);
router.get('/get/', userController.get);
router.put('/update-profile/:id', userController.update);
router.put('/update-client/:id', userController.update);
router.get('/get/:id', userController.getById);
router.delete('/delete-profile/:id', userController.delete);
router.delete('/delete-client/:id', userController.delete);
module.exports = router;