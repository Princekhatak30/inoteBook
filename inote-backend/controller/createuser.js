const express = require('express');
const conn = require("../db/conn")
const router = new express.Router();
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const JWT_SECRET = 'princekh@t@k'

exports.usersget = async (req, res) => {
    // if there are error return bad resquest and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });

    }
    try {
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(req.body.Password, salt)
        const Password = hashPass
        const { Name, Email, Date } = req.body
        let obj = {}
        let query = `insert into userdetail (Name, Email, Password, Date) value (?,?,?,now())`
        if (!Name || !Email || !Password || Date) {
            obj.message = ' all fields all require'
            obj.success = false
            res.json(obj)
        }
        conn.query(query, [Name, Email, Password, Date], (err, result) => {
            if (err) {
                obj.message = 'database query error'
                obj.success = false
                res.status(500).json("Database query error", err.message)

            } else {
                const userId = result.insertId;
                const data = {
                    userdetail: {
                        Id: userId,
                        Name: Name,
                        Email: Email,
                        Password: Password
                    }
                }
                const jwtdata = jwt.sign(data, JWT_SECRET)
                obj.token = jwtdata
                obj.message = 'data added successfully'
                obj.success = true
                obj.data = data
               res.status(200).json(obj);
            }   
        })

    }
    catch (error) {
        return res.status(500).json({ message: 'Error processing request', success: false });
    }
}