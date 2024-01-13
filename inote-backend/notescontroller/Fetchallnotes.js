const express = require('express');
const conn = require("../db/conn")
const router = new express.Router();

exports.fetchNotes = async (req, res) => {
    const obj = {}
     const userId = res.userdetail.Id;
     let query = 'select * from usernotes where Id = ?'
     conn.query(query,[userId],(err,result)=>{
        if(err){
            obj.message = 'database query error'
            obj.success = false
            res.json('database query error',err.message)
        }else{
            
                if (result.length === 0) {
                    obj.message = 'No any note found';
                    obj.success = false;
                    res.json(obj)
                }else{

                    obj.message = 'data found successfully '
                    obj.success = true
                    obj.data = result
                    res.json(obj)
                }
        }
     })
}