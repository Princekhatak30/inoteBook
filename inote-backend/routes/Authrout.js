const express = require('express');
const router = new express.Router();
const createuser = require("../controller/createuser");
const authenticate = require("../controller/authenticatuser");
const Getuser = require("../controller/getuser");
var fetchuser = require("../middleware/Fetchuser")
const app = express()
app.use(express.json())
const { body, validationResult } = require('express-validator');


// Route: 1 create a user using: post "/api/auth/createuser" . no login required
router.post("/api/auth/createuser", [
    body('Name', 'enter a valid name').isLength({ min: 3 }),
    body('Email', 'enter a valid email').isEmail(),
    body('Password', 'password must be atleast 6 character').isLength({ min: 6 })
], createuser.usersget);

// Route: 2 authenticate a user using: post "/api/auth/login" . no login required
router.post("/api/auth/login", [

    body('Email', 'enter a valid email').isEmail(),
    body('Password', 'password cannot be blank').exists()
], authenticate.authenticate);

// Route: 1 get logedin user details using: post "/api/auth/getuser" .  login required
router.get("/api/auth/getuser",fetchuser,Getuser.getuser);

module.exports = router