const express = require('express');
const app = express();
const mysql = require('mysql2');

app.listen(8081,()=>{
    console.log("listening to port 8081");
});

app.use(express.static("sf"));

let dbparams = {
    host: 'localhost',
    user: 'root',
    password: 'cdac',
    database: 'test',
	port: 3306
}

const con = mysql.createConnection(dbparams);
console.log("database added");

app.get("/getdetails",(req,resp)=>{
    console.log("getdetail");
    let bookid = req.query.bookid;
    console.log(bookid);

    let output = {status:false,bookdetails:{bookid:0,bookname:"",price:0}};
    con.query('select * from book where bookid = ?',[bookid],
    (err,res)=>{
        if(err){
            console.log("some error"+err);
        }
        else{
            if(row.length > 0){
                output.status = true;
                output.bookdetails = rows[0];
            }
            else{
                console.log("Book not found");

            }
        }
        resp.send(output);
    });
});

app.get("/addbook",(req,resp)=>{
    console.log("addbook function");
    let bookdetails = {bookid:req.query.bookid,bookname:req.query.bookname,price:req.query.price}

    let output = {status:false};
    con.query('insert into book(bookid,bookname,price) values(?,?,?)',[bookid,bookname,price],
    (err,res)=>{
        if(err){
            console.log("some error"+err);
        }
        else{
            if(res.affectedRows > 0){
                output.status = true;
                console.log("added successfully");
            }
            else{
                console.log("Book not added");

            }
        }
        resp.send(output);
    });
});