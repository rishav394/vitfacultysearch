var path = require('path');
var ncp = require('ncp').ncp;
const fs = require('fs');

const parent = path.resolve(__dirname, '..');
const src = path.join(parent, 'src');
const destination = path.join(parent, 'functions');
const files = ['package.json', 'package-lock.json', '.gitignore'];

ncp(src, destination, function(err) {
	if (err) {
		return console.error(err);
	}
	files.forEach(file => {
		fs.copyFileSync(path.join(parent, file), path.join(destination, file));
	});
	console.log('done!');
});
