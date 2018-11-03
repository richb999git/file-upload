'use strict';

var express = require('express');
var cors = require('cors');

// require and use "multer"...
var multer  = require('multer');
var app = express();


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, "./public/");
    },
    filename: function(req, file, cb) {
      cb(null, Date.now() + file.originalname);
    }                          
});


app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

const upload = multer({storage: storage}).single("upfile");

app.post("/api/fileanalyse", function(req, res) {
  upload(req, res, function(err) {
    if (err) {
      console.log(req.body);
      console.log(err);
      res.send("Error loading file");
    } else {
      console.log(req.file);
      res.json({name: req.file.originalname, type: req.file.mimetype, filesize: req.file.size});
    }
  }); 
});




app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
