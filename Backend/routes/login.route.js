// connect router
const { Router } = require("express");
const bodyParser = require("body-parser");
const { body, validationResult } = require("express-validator");

// call the functions 
const {DealWithSignin,DealWithSignout}=require('../controllers/login.controller.js');

const router = Router();
// Parse JSON bodies for this router using body-parser middleware
router.use(bodyParser.json());

// deal with signin
router.patch(
  "/",
  // [
  //   body("email", "Enter a valid email").isEmail(),
  //   body("password", "Password cannot be blank").exists(),
  // ],
  DealWithSignin
);

// nothing is given in params but suggestion is to use the token generated on login.
router.patch(
  "/logout",
  DealWithSignout
);

module.exports = router;