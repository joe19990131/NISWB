var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.location('/')
  res.render('index', { title: 'Express' });
});

router.get(/(.*)\.(jpg|gif|png|ico|css|js|txt|svg|ttf|eot|woff|map)/i, function(req, res) {
  res.sendfile(__dirname + "/" + req.params[0] + "." + req.params[1], function(err) {
      if (err) res.send(404);
  });
});
module.exports = router;
