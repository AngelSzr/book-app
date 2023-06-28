import express from "express";
import mysql from "mysql";
import cors from 'cors'

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "AE2018620351",
  database: "test",
});

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
  res.json("Hello from BE!");
});

app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/books",(req,res)=>{
    const q="INSERT INTO books(`titles`,`description`,`cover`,`price`) values (?)"
    const values=[
        req.body.titles,
        req.body.description,
        req.body.cover,
        req.body.price,
    ]

    db.query(q,[values],(err,data)=>{
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.delete('/books/:id',(req,res)=>{
  const bookId=req.params.id
  const q="DELETE FROM books WHERE id=?"

  db.query(q,[bookId],(err,data)=>{
    if(err) return res.json(err)
    return res.json('Book has been deleted successfully.')
  })
})

app.put('/books/:id',(req,res)=>{
  const bookId=req.params.id
  const q="UPDATE books SET `titles`=?, `description`=?, `price`=?,`cover`=? where id=?"

  const values=[ req.body.titles,
    req.body.description,
    req.body.price,
    req.body.cover,]  

  db.query(q,[...values,bookId],(err,data)=>{
    if(err) return res.json(err)
    return res.json('Book has been updated successfully.')
  })
})

app.listen(8800, () => {
  console.log("connected to BackEnd!");
});
