var request = require('request');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/static'));

app.get('/', function(req, res) {
  var body = {};
  res.render('../static/index.pug');
});

app.get('/search/many/:query', function(req, res) {
  var url = 'http://api.giphy.com/v1/gifs/search?'
  request({
    url: url,
    qs: {
      limit: 1000,
      api_key: 'UGAbbHcK7BJHUP9pGS8EVxwm992Fe9tz',
      q: req.params.query,
      rating: 'g'
    }
  }, function(error, response, body) {
    body = JSON.parse(body);
    var data = body.data;
    resData = [];
    for (var i = 0; i < data.length; i++) {
      index = Math.floor(Math.random() * data.length);
      resData.push(data[index]);
    }
    res.render('index', {data: resData})
  });
});

app.get('/search/one/:query', function(req, res) {
  var url = 'http://api.giphy.com/v1/gifs/search?'
  request({
    url: url,
    qs: {
      limit: 100,
      api_key: 'UGAbbHcK7BJHUP9pGS8EVxwm992Fe9tz',
      q: req.params.query,
      rating: 'g'
    }
  }, function(error, response, body) {
    body = JSON.parse(body);
    var data = body.data;
    var index = Math.floor(Math.random() * data.length);
    data = data[index];
    res.render('index', {data: [data]})
  });
});

app.listen(3000, console.log('Listening on port 3000'));
