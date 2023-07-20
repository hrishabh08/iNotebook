const express = require('express');
const User = require("../models/User")
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "Backendfornotesapp";
const fetchuser = require("../middleware/fetchuser");
const { flushSync } = require('react-dom');


//ROUTE 1
//registering a user
router.post('/createuser', [// password must be at least 5 chars long
  body('password', 'Enter valid password').isLength({ min: 5 }),
  body('email', 'Enter valid email').isEmail(),
  body('name', 'Enter valid name').isLength({ min: 5 })], async (req, res) => {

    let success = false;
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() })
    };

    try {

      //check if the user with this email already exists
      let user = await User.findOne({ email: req.body.email })
      if (user) {
        return res.status(400).json({ success: false, error: "Sorry a user with this email already exist" })
      }

      //hashing password
      let salt = await bcrypt.genSaltSync(10);
      let securePassword = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        password: securePassword,
        email: req.body.email
      })
      const data = {
        user: {
          id: user.id,
        }
      };
      var jwtData = jwt.sign(data, JWT_SECRET);
      console.log(success, jwtData);
      res.json({ success: true, user, jwtData })
    }
    catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occured");
    }
  })

//ROUTE 2
//Authenticate the user : USER LOGIN
router.post('/login', [
  //password cannot be blank
  body('password', 'Password cannot be blank').exists(),
  //email should be valid
  body('email', 'Enter valid email').isEmail()], async (req, res) => {

    let success = false;
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    };


    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ success: false, error: "Please try to login with correct credential" })
        success = false;
      }
      //compare password
      const passwordcompare = await bcrypt.compare(password, user.password);
      if (!passwordcompare) {
        return res.status(400).json({ success: false, error: "Please try to login with correct credential" })
      }

      //data return
      const data = {
        user: {
          id: user.id,
        }
      };
      var jwtdata = jwt.sign(data, JWT_SECRET);
      res.json({ success: true, authToken: jwtdata })//auth token //responce giving

    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error occured");
    }

  })

//ROUTE 3 fetch the data of a user
router.post('/getuser', fetchuser, async (req, res) => {
  try {
    var userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);

  }
  catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error occured");
  }

})



module.exports = router