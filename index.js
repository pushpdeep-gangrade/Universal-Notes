const express = require('express');
var cors = require('cors');
const app = express();
var mysql = require('mysql');

app.use(cors());

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "Notes"
});

const port = 8080

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));

app.get('/',function(req,res){
    res.render("404.ejs");
});
app.get('/notes', function(req,res) {
  con.query("SELECT * FROM Notes", function (err, result, fields) {
    if (err) throw err;
    res.render("index.ejs",{result:result,
    editresult:[]});
  });
});

app.get('/notes/:Title', function(req,res) {
  con.query("SELECT * FROM Notes where Title='" +req.params.Title +"'", function (err, result, fields) {
    if (err) throw err;
    res.render("index.ejs",{result:result,
    editresult:result});
  });
});

app.post('/notes', function(req,res) {
  const sql = "Insert into Notes(Title,Detail,Created,LastModified) values ('"
              + req.body.note_title + "','"
              + req.body.note_detail + "',"
              + "CURRENT_DATE(),CURRENT_DATE());"
 con.query(sql, function (err, result, fields) {
    if (err) throw err;
    con.query("SELECT * FROM Notes", function (err, result, fields) {
      if (err) throw err;
      res.render("index.ejs",{result:result,
      editresult:[]});
    });
  });
});


app.put('/notes/:title', function(req,res) {
  const sql = "Update Notes set title='"
  + req.body.note_title + "',Detail='"
  + req.body.note_detail + "',Created=CURRENT_DATE()"
  +  ",LastModified=CURRENT_DATE() where Title='"+ req.params.title + "';";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    res.send(result);

  });
});

app.patch('/notes/:title', async function(req,res) {
  const sql = "Update Notes set title='"
  + req.body.note_title + "',Detail='"
  + req.body.note_detail + "',LastModified="
  + "CURRENT_DATE() where title='" +req.params.title + "';";

 con.query(sql, function (err, result, fields) {
      if (err) throw err;
      res.send(result);
   });
});

app.delete('/notes/:Title', function(req,res) {
  var abc = con.query("DELETE FROM Notes where title='" + req.params.Title +"';", function (err, result, fields) {
    if (err) throw err;
res.send("Deleted Successfully");
  });
});

app.listen(port, (req, res) => {
});
