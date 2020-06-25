var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var app = express();

//sql qetting
var connStatus = 0;
var conn = mysql.createConnection({
  host: 'localhost',
  prot: '3306',
  user: 'root',
  password: '123456',
  database: 'nis'
});
/*var conn = mysql.createConnection({
  host : 'JS108-36',
  prot : '3306',
  user: 'niswb',
  password : '123456',
  database : 'nis'
});*/
//sql setting end
/* GET home page. */
router.get('/', function (req, res, next) {
  res.location('/')
  res.render('index', { title: 'NIS WhiteBoard' });

});


router.post('/getEElist', function (req, res, next) {
  var nstNo = req.body['nstNo'];
  var sql = "select EEName,EENo,DeptCode from eecode WHERE DeptCode = concat('A','" + nstNo + "','0');";
  console.log("i am SBL2");
  if (connStatus == 0) {
    conn.connect(function (err) {
      if (err) throw err;
      console.log('connect success!');
      connStatus++;
      console.log(connStatus);
    });
  }
  conn.query(sql, function (err, rows) {
    console.log(rows);
    if (err) {
      console.log(err);
    } else {
      res.jsonp(rows);
      //res.end();
    }
  })
});
//document.ready please copy below code
router.post('/getCKlist', function (req, res, next) {
  var sql = "SELECT distinct CKSort,CKCon from checkrecord;";
  console.log("i am SBL2");
  conn.query(sql, function (err, rows) {
    console.log(rows);
    if (err) {
      console.log(err);
    } else {
      res.jsonp(rows);
      //res.end();
    }
  })
});

router.post('/getFNamelist', function (req, res, next) {
  var sql = "SELECT FName,FNo from mdeddata;";
  console.log("i am SBL2");
  conn.query(sql, function (err, rows) {
    console.log(rows);
    if (err) {
      console.log(err);
    } else {
      res.jsonp(rows);
      //res.end();
    }
  })
});

router.post('/getBedlist', function (req, res, next) {
  var sql = "select BNo,taboo_11,bidx_01,bidx_02,bidx_03,bidx_04,bidx_05,bidx_06,bidx_07,bidx_08,bidx_09,bidx_10,callrequest from bedrecord left join bhdata using(BNo) left join bedidx using(pno) left join taboorecord using(pno) left join callrecording using (bno) where bedrecord.NST = 12;";
  console.log("i am SBL2");
  conn.query(sql, function (err, rows) {
    //sconsole.log(rows);
    if (err) {
      console.log(err);
    } else {
      res.json(rows);
      console.log(rows);
      //res.end();
    }
  })
});

router.post('/edu', function (req, res, next){
  var sql = "SELECT fileURL,FName from mdeddata;"
  console.log("i am SBL2");
  conn.query(sql, function (err, rows) {
    // console.log(ros);
    if (err) {
      console.log(err);
    } else {
      res.json(rows);
      console.log(rows);
      // res.end();
    }
  })
});

router.post('/lab', function (req, res, next) {
  var nstNo = req.body['nstNo'];
  var MN = req.body['MN'];
  var lt = req.body['CKSort']
  console.log(MN);
  var sql = "select nst, BNo, CkCon,CKSort,DATE_FORMAT(ckdate, '%Y / %m / %d') as ckdate " +
    "from checkrecord join bhdata using(pNo) join bedrecord using(BNo)" +
    " where " +
    "(nst = '" + nstNo + "') " +
    "and (mn = '" + MN + "' or '' = '" + MN + "')" +
    "and (cksort = '" + lt + "' or '' = '" + lt + "') " +
    "order by Bno;"

  //console.log(req);
  console.log("i am SBL");

  if (connStatus == 0) {
    conn.connect(function (err) {
      if (err) throw err;
      console.log('connect success!');
      connStatus++;
      console.log(connStatus);
    });
  }
  conn.query(sql, function (err, rows) {
    //console.log(rows);
    console.log(req);
    if (err) {
      console.log(err);
    } else {
      res.json(rows);
      //res.end();
    }
  })
});
router.get(/(.*)\.(jpg|gif|png|ico|css|js|txt|svg|ttf|eot|woff|map)/i, function (req, res) {
  res.sendfile(__dirname + "/" + req.params[0] + "." + req.params[1], function (err) {
    if (err) res.send(404);
  });
});

module.exports = router;
