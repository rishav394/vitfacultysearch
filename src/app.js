var bodyParser = require('body-parser');
var cors = require('cors');
var express = require('express');
var faculty = require('./faculty');
var favicon = require('serve-favicon');
var path = require('path');
var ssl = require('heroku-ssl-redirect');
var app = express();

app.use(favicon(path.join(__dirname, '/public/favicon.ico')));
app.use(cors());
app.use(ssl());
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true,
	}),
);
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.post('/', (req, res) => {
	var greenLight = false;

	// Just checks if anything was filled at all or not
	for (var attributename in req.body) {
		if (req.body[attributename]) {
			greenLight = true;
		}
	}
	if (greenLight) {
		faculty.find(req.body, results => {
			res.render('index', {
				results: results,
			});
		});
	} else {
		res.redirect('/');
	}
});

app.get('/', (req, res) => {
	res.render('index', {
		results: [],
	});
});

app.get('/details/:empId', (req, res) => {
	faculty.findByEmpid(req.params.empId, callbackResult => {
		if (callbackResult == null) {
			res.render('emp404', {
				empId: req.params.empId,
			});
		} else {
			res.render('details', {
				mydata: callbackResult,
				url: req.originalUrl,
			});
		}
	});
});

// app.use('/', (req, res, next) => {
// 	res.redirect('/');
// });

module.exports = app;
