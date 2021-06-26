var express = require('express');
var router = express.Router();

const MainController = require('../controllers/index');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// router.post('/execute-mongo-query',MainController.executeMongoShell);
router.post('/execute-mongo-query',MainController.executeMongoQuery);

module.exports = router;
