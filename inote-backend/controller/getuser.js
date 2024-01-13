const express = require('express');
const conn = require("../db/conn")
const router = new express.Router();
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

// const JWT_SECRET = 'princekh@t@k'


exports.getuser = async (req,res)=>{
    // Access user details attached to req object by fetchuser middlewar 
     const obj = {}
     const userEmail = res.userdetail.Email;
     let query = 'select * from userdetail where Email = ?'
     conn.query(query,[userEmail],(err,result)=>{
        if(err){
            obj.message = 'database query error'
            obj.success = false
            res.json('database query error',err.message)
        }else{
            
                if (result.length === 0) {
                    obj.message = 'No user found';
                    obj.success = false;
                    res.status(404).json(obj);
                }else{

                    obj.message = 'data found successfully '
                    obj.success = true
                    obj.data = result
                    res.json(obj)
                }
        }
     })
}