var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var app = express();

//sql qetting
var connStatus = 0;
var conn = mysql.createConnection({
  host : 'localhost',
  prot : '3306',
  user: 'root',
  password : '123456',
  database : 'nis'
});
//sql setting end
/* GET home page. */
router.get('/', function(req, res, next) {
  res.location('/')
  res.render('index', { title: 'Express' });
  
});


router.post('/getEElist',function(req,res,next){
  var sql = "select EEName,EENo from eecode;"
  console.log("i am SBL2");
  if(connStatus == 0){
    conn.connect(function(err){
      if(err) throw err;
      console.log('connect success!');
      connStatus ++;
      console.log(connStatus);
      });
  }
  conn.query(sql,function(err,rows){
    console.log(rows);
    if(err){
      console.log(err);
    }else{
      res.jsonp(rows);
      //res.end();
    }
  })
});

router.post('/lab',function(req,res,next){
var nstNo = req.body['nstNo'];
var MN = req.body['MN'];
console.log(MN);
  var sql = "select nst, BNo, CkCon,ckdate "+
  "from checkrecord join bhdata using(pNo) join bedrecord using(BNo)"+
  " where nst = '"+nstNo+"' order by Bno;"
            
  //console.log(req);
  console.log("i am SBL");

  if(connStatus == 0){
    conn.connect(function(err){
      if(err) throw err;
      console.log('connect success!');
      connStatus ++;
      console.log(connStatus);
      });
  }
  conn.query(sql,function(err,rows){
    console.log(rows);
    if(err){
      console.log(err);
    }else{
      res.json(rows);
      //res.end();
    }
  })
});
router.get(/(.*)\.(jpg|gif|png|ico|css|js|txt|svg|ttf|eot|woff|map)/i, function(req, res) {
  res.sendfile(__dirname + "/" + req.params[0] + "." + req.params[1], function(err) {
      if (err) res.send(404);
  });
});

module.exports = router;
