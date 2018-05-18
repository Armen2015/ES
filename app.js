var ES = require('./elasticSearch-lib');
var express = require('express');
// const cors = require('cors');
var app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.listen(1338, () => console.log('listening on port 1338!'));


app.route('/elastic/ping').get((req, res) => {
  ES.ping(req, res);
});

app.route('/elastic/index/init').post((req, res) => {
  var index = req.body.index_name;
  ES.initIndex(req, res, index);
});

app.route('/elastic/index/check').post((req, res) => {
  var index = req.body.index_name;
  ES.indexExists(req, res, index);
});

app.route('/elastic/index/mapping').post((req, res) => {
  var payload = req.body.payload;
  var index = req.body.index_name;
  var docType = req.body.type;
  ES.initMapping(req, res, index, docType, payload);
  return null;
});

app.route('/elastic/add').post((req, res) => {
  var payload = req.body.payload;
  var index = req.body.index_name;
  var _id = req.body._id;
  var docType = req.body.type;
  ES.addDocument(req, res, index, _id, docType, payload);
  return null;
});

app.route('/elastic/search').post((req, res) => {
  var payload = req.body.payload;
  var index = req.body.index_name;
  var docType = req.body.type;
  ES.search(req, res, index, docType, payload);
});

app.route('/elastic/update').put((req, res) => {
  var index = req.body.index_name;
  var payload = req.body.payload;
  var docType = req.body.type;
  var _id = req.body._id;
  ES.updateDocument(req, res, index, _id, docType, payload);
  return null; 
});

/************************************************* */

app.route('/elastic/delete_all').get((req, res) => {
  ES.deleteAll(req, res);
});

app.route('/elastic/delete-document').delete((req, res) => {
  var index = req.body.index_name;
  var _id = req.body._id;
  var docType = req.body.type;
  ES.deleteDocument(req, res, index, _id, docType);
  return null; 
});