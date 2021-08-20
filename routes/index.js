var express = require('express');
var router = express.Router();
const distanceInWords = require("date-fns/formatDistanceToNow");
const db = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
  db.Message.findAll({order:[['createdAt', 'DESC']]}).then(messageObjs => {
    res.render('index', {
      title: 'Overheard SPIS', 
      format: distanceInWords,
      messageObjs: messageObjs
    });
  });
});

router.get('/new', function(req, res, next) {
  res.render('new');
});

// send new messages to the database, then redirect back to the main site
router.post('/new', function(req,res){
  
  const newMessage = {
    text:req.body.message,
    author:req.body.author,
    added:req.body.added,
  };

  db.Message.create(newMessage)
    .then(data => { 
      res.send(data);
    })
    .catch(err => {
      console.log(err);
    });

  res.redirect('/')

});

router.get('/disclaimer', function(req, res, next) {
  res.render('disclaimer');
});

router.get('/bear', function(req, res, next){
  res.render('bear');
});

router.get('*', function(req, res, next) {
  res.render('404');
});



module.exports = router;
