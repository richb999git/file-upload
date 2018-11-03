'use strict';

var express = require('express');
var cors = require('cors');

// require and use "multer"...
var multer  = require('multer');
var app = express();


const storage = multer.diskStorage({
    destination: function(req, file, next) {
      next(null, "./public/uploads/");
    },
    
    onError : function(err, next) {
      console.log('error', err);
      next(err);
    },
  
    filename: function(req, file, next) {
        next(null, Date.now() + file.originalname);   
    }                          
});


app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

const upload = multer({storage: storage}).single("upfile");

app.post("/api/fileanalyse", upload, function(err, req, res, next) {
    if (err) {
      console.log(err);
      res.send("Error loading/saving file");
    } else if (!req.file) {
      res.send("No file to upload");
    } else {
      res.json({filename: req.file.originalname, filesize: req.file.size});
    }
});


app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
