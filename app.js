var express = require('express');
var app = express();
var nunjucks = require('nunjucks');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var models = require('./models');
var db = models.db;
var router = require('./routes')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/public'));
app.use('/bootstrap', express.static(__dirname + "/node_modules/bootstrap/dist"));
app.use('/jquery', express.static(__dirname + "/bower_components/jquery/dist"));

app.use('/', router);


nunjucks.configure('views', {noCache: true});
app.engine('html', nunjucks.render);
app.set('view engine', 'html');

app.use(morgan('dev'));

app.use(function(req, res, next){
  var err = new Error('Not Found');
  err.status = 404;
  console.error(err);
  next(err);
})

app.use(function(err, req, res, next){
  res.status(err.status || 500);
  console.error(err);
  res.render('error', {err: err});

})

db.sync()
.then(function(){
        console.log('syncing with db');
        app.listen(3000, function(){
       console.log('listening on port 3000...')
        });
})
.catch(console.error);



