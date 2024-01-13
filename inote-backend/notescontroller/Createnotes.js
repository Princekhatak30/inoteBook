const express = require('express');
const conn = require("../db/conn")
const router = new express.Router();
const { validationResult, Result } = require('express-validator');

exports.createnote = async (req, res) => {
    // if there are error return bad resquest and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {

        let obj = {}
        const { Title, Description, Tag } = req.body
        const Id = res.userdetail.Id
        let date = new Date();
        let query = `insert into usernotes (Title, Description, Tag, Id, Date) value ('${Title}','${Description}','${Tag}',${Id}, ?)`
        if (!Title || !Description || !Tag) {
            obj.message = ' all fields all require'
            obj.success = false
            res.json(obj)
        }
        conn.query(query, [date], (err, result) => {
            if (err) {
                obj.message = 'database query error'
                obj.success = false
                res.status(500).json("Database query error", err.message)

            }
            obj.message = 'data added successfully'
            obj.success = true
            obj.data = result
            res.status(200).json(obj);
        })

    }
    catch (error) {
        return res.status(500).json({ message: 'Error processing request', success: false });
    }

}