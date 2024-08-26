const express = require('express')
const router = express.Router()
const User = require('../models/user')
const { body, validationResult } = require('express-validator');
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const jwtSecret = "mynameisreekcompletedmyenginering2022"

router.post("/createuser",
    body('email', "Incorrect Email").isEmail(),
    body('name').isLength({ min: 5 }),
    body('password', "Incorrect password").isLength({ min: 5 }), async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const salt = await bcrypt.genSalt(10);
        let secPassword = await bcrypt.hash(req.body.password,salt)

        try {
            await User.create({
                name: req.body.name,
                password: secPassword,
                email: req.body.email,
                location: req.body.location,
            })
            res.json({ success: true })
        }
        catch (error) {
            console.log(error);
            res.json({ success: false })
        }
    })

router.post("/loginuser",
    body('email', "Incorrect Email").isEmail(),
    body('password', "Incorrect password").isLength({ min: 5 }),
    async (req, res) => {
        
        let email = req.body.email;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            let userData = await User.findOne({ email })
            if (!userData) {
                return res.status(400).json({ errors: "Try login with correct credential" });
            }

            const pwdCompare = await bcrypt.compare(req.body.password,userData.password);
            const data = {
                user:{
                    id: userData.id,
                }
            };

            const authToken = jwt.sign(data,jwtSecret);

            if (!pwdCompare) {
                return res.status(400).json({ errors: "Try login with correct credential" });
            }

            else {
                return res.json({ success: true,authToken: authToken })
            }
        }
        catch (error) {
            console.log(error);
            res.json({ success: false })
        }
    })

module.exports = router;