let express = require('express');
let router = express.Router();

const MainController = require('../controllers/index');
/* GET home page. */
const path = require('path');
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '/index.html'));
});

// router.post('/execute-mongo-query',MainController.executeMongoShell);
router.post('/execute-mongo-query',MainController.executeMongoQuery);
router.post('/export-mongo-query',MainController.exportMongoQuery);

module.exports = router;
