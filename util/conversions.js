const path = require('path');
const fs = require('fs');
const spawn = require('child_process').spawn;
const file = path.join(__dirname, 'conversions.py');

const pythonProcess = spawn('python', [file], {
	cwd: __dirname,
});

pythonProcess.stdout.on('data', (data) => {
	console.log(data.toString());
});

pythonProcess.on('close', (code, signal) => {
	if (code != 0)
		console.error(
			'The python script returned an error. Please manually run the script, fix the errors and try again.',
		);
	else {
		fs.copyFileSync(
			path.join(__dirname, 'facultyall.json'),
			path.join(path.resolve(__dirname, '..'), 'src', 'facultyall.json'),
		);
		console.log('Copied facultyall.json successfully');
	}
});
