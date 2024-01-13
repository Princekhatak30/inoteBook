const express = require('express');
const conn = require("../db/conn")
const router = new express.Router();
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const JWT_SECRET = 'princekh@t@k'

exports.authenticate = (req,res)=>{
    // if there is any error  , return bad request  and the  errors
    const error = validationResult( {req})
    if(!error.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    let obj = {}
    try {
        const {Email,Password} = req.body
        let query = 'select * from userdetail where Email = ?';
        conn.query(query,[Email] , async(err,result)=>{
            if(err){
                obj.message = 'database query error'
                res.json(obj)
            }
            if(result.length === 0){
                obj.message= 'please try to login with correct credential'
                obj.success = false
                res.json(obj)
            }
            const user = result[0]
            const passwordMatch = await bcrypt.compare(Password,user.Password )
            if(!passwordMatch){
                obj.message = 'please try to login with correct credential'
                obj.success = false
                return res.status(401).json(obj)
            }
              // Create and assign a token using JWT
              const userId = result.insertId;
              const data = {
                  userdetail: {
                      Id: userId,
                      Email: user.Email
                      
                  }
              }
              const jwtData = jwt.sign(data,JWT_SECRET)
              obj.token = jwtData
              obj.success = true
              res.json(obj)
           
        })
        
    } catch (error) {
        return res.status(500).json({ message: 'Error processing request', success: false });  
    }
}