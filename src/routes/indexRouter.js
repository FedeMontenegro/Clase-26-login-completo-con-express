const express = require("express");
const router = express();

let {home} = require("../controllers/indexController");
let sessionMiddleware = require("../middlewares/sessionMiddleware");

router.get("/", sessionMiddleware, home);

module.exports = router;