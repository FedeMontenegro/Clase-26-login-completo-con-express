var express = require('express');
var router = express.Router();
let {login, loginProcess, register, registerProcess, destroySession, end} = require("../controllers/userController");
const loginValidator = require("../validations/loginValidator");
const registerValidator = require("../validations/registerValidator");

/* GET users listing. */
router.get('/login', login);
router.post('/login', loginValidator, loginProcess);
router.get('/register', register);
router.post("/register", registerValidator, registerProcess);
router.post("/logout", destroySession);
router.get("/end", end)

module.exports = router;