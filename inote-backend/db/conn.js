const mysql2 = require('mysql2');
const conn = mysql2.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"inotebook"
})
// const cheackdbconnection =()=>{

    // conn.connect((err)=>{
    //     if(err){
    //         console.error('Error to connect with db',err);
    //     }else{
    //         console.log('connected to database');
    //     }
    // })
// }
module.exports = conn