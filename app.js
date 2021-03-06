
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')

var login = require('./routes/login');
var index = require('./routes/index');
var search = require('./routes/search');
var searchEngine = require('./public/js/searchEngine');
var editBucket = require('./routes/edit');
var refinedSearch = require('./routes/refinedSearch');
var add = require('./routes/add');

// var result = require ('./routes/getResult');

// Example route
// var user = require('./routes/user');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('IxD secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', login.view);
app.get('/index', index.view);
app.get('/index_B', index.viewAlt);
app.get('/search', search.postQuery);
app.get('/makeQuery', searchEngine.makeQuery);
app.get('/edit', editBucket.editView);
app.get('/editBucket', editBucket.view);
app.get('/refine', refinedSearch.view);
app.get('/add', add.view);
app.get('/addCategory', add.addCategory);
app.get('/makeEdit', editBucket.makeEdit);
app.get('/delete', editBucket.delete);
//app.get('/addTerm', editBucket.addTerm);
//app.get('/removeTerm', editBucket.removeTerm);
// app.get('/getResult', result.getResult);
// Example route
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
