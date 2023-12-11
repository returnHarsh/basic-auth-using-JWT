const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const userController2 = require("../controllers/userController2");
const auth = require("../middlewares/auth");
const isLoggedIn = require("../middlewares/isLoggedIn");

// PUBLIC ROUTES




router.get('/' ,  userController2().home);

router.get("/smoothies" ,isLoggedIn , userController2().smoothies);

router.get("/login" , userController2().getLogin);



router.get("/register" , userController2().getRegister);

router.get("/logout" , userController2().logout);

router.post("/register" , userController().userRegistration);
router.post("/login" , userController().userLogin);



// PRIVATE ROUTES

module.exports = router