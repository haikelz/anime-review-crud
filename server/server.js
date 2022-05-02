const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
const cors = require("cors"); 

// fix cors issue
app.use(cors()); 
app.use(express.json()); 
app.use(bodyParser.urlencoded({extended: true}));

// get all information from table movie_reviews in database 
app.get("/api/get", (req, res) => {
    const sqlSelect = "SELECT * FROM anime;";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    })
})

// create movie
app.post("/api/insert", (req, res) => {
    // catch animeName and animeReview from frontend
    const animeName = req.body.animeName;
    const animeReview = req.body.animeReview;
    
    const sqlInsert = "INSERT INTO anime (animeName, animeReview) VALUES (?, ?);";
    db.query(sqlInsert, [animeName, animeReview], (err, result) => {
        console.log(result);
    });
});

app.delete("/api/delete/:animeName", (req, res) => {
    const name = req.params.animeName;
    const sqlDelete = "DELETE FROM anime WHERE animeName = ?;";

    db.query(sqlDelete, name, (err, result) => {
        console.log(result);
    });
});

app.put("/api/update", (req, res) => {
    const name = req.body.animeName;
    const review = req.body.animeReview;
    const sqlUpdate = "UPDATE anime SET animeReview = ? WHERE animeName = ?;";

    db.query(sqlUpdate, [review, name], (err, result) => {
        console.log(result);
    });
});

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "react_crud",
});

app.listen(3001, () => {
    console.log("Udah nyala cui");
});