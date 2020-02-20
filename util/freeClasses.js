var data = require('./allocationReport.json');

data = JSON.parse(JSON.stringify(data));

var allVenues = [];

const checker = value => {
	var prohibited = ['L', 'NIL'];

	for (var i = 0; i < prohibited.length; i++) {
		if (
			value['SLOT'].indexOf(prohibited[i]) > -1 ||
			value['VENUE'].indexOf(prohibited[i]) > -1
		) {
			return false;
		}
	}
	allVenues.push(value['VENUE']);
	return true;
};

data = data.filter(checker);

var bookedVenues = {};

data.map(element => {
	var main = {};
	main['VENUE'] = element['VENUE'];
	main['SLOT'] = element['SLOT'].split('+');
	main['SLOT'].forEach(slot => {
		if (Object.keys(bookedVenues).indexOf(slot) == -1) {
			bookedVenues[slot] = [main['VENUE']];
		} else {
			bookedVenues[slot].push(main['VENUE']);
		}
	});
});

//#region Not necessary
var ordered = {};
Object.keys(bookedVenues).forEach(key => {
	ordered[key] = bookedVenues[key];
});

bookedVenues = ordered;
//#endregion

module.exports = { bookedVenues, allVenues };
