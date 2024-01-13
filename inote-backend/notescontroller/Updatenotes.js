const express = require('express');
const conn = require("../db/conn")
const router = new express.Router();
exports.updatenote = async (req, res) => {
    const obj = {}
    const keynoteId = req.params.id
    const userId = res.userdetail.Id;
    const { Title, Description, Tag } = req.body

    try {
        let query = `  UPDATE usernotes SET Title=?, Description=?, Tag=?  WHERE   keynoteId = ? `
        conn.query(query, [Title, Description, Tag, keynoteId, userId], async (err, result) => {
            if (err) {
                obj.message = 'database query error'
                obj.success = false
                res.json(obj)

            } else {
                if (!keynoteId) {
                    return res.status(404).send('not  any note found ')
                }
                if (result.affectedRows === 0) {
                    res.status(401).send(' You are not authorized to update this note')
                }

                obj.message = 'Data updated successfully'
                obj.success = true
                obj.new = true
                obj.data = result
                res.json(obj)
            }
        })
    } catch (error) {
        return res.status(500).json({ message: 'Error processing request', success: false });
    }
}