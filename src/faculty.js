var data = require('./facultyall.json');

module.exports = {
	find: function(faculty_json, callback) {
		var tosend = [];

		faculty_json.email = faculty_json.email.split('@')[0].toLowerCase();
		faculty_json.cabin = faculty_json.cabin.toUpperCase();
		faculty_json.designation = faculty_json.designation.toLowerCase();
		faculty_json.name = faculty_json.name.toUpperCase();
		faculty_json.empid = faculty_json.empid.toUpperCase();

		for (let index = 0; index < data.length; index++) {
			const element = data[index];

			if (
				element.name.includes(faculty_json.name) &&
				element.email.includes(faculty_json.email) &&
				element.cabin.includes(faculty_json.cabin) &&
				element.designation.toLowerCase().includes(faculty_json.designation) &&
				element.empId.toUpperCase().includes(faculty_json.empid)
			) {
				tosend.push(element);
			}
		}
		callback(tosend);
	},
	findByEmpid: function(empid, callback) {
		for (let index = 0; index < data.length; index++) {
			const element = data[index];
			if (element.empId == empid) {
				callback(element);
				return element;
			}
		}

		//  IDEALLY SHOLD NEVER HAPPEN
		callback(null);
		return null;
	},
};
