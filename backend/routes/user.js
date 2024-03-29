const express = require("express");
const { register, activateAccount,login, auth } = require("../controllers/user");
const { authUser } = require("../middelwares/auth");
const router = express.Router();

router.post("/register", register)
router.post("/activate", authUser, activateAccount)
router.post("/login", login)
router.post("/auth",authUser, auth)

module.exports = router;