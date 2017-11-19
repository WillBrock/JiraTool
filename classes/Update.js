`use strict`;

const Jira = require(`../lib/Jira`);

class Update {
	/**
	 * Update an existing issue
	 * @param  {String} issue_key    Key of the issue to update
	 * @param  {String} input_field  Field to update
	 * @param  {String} value        Value of the field
	 * @param  {String} action       add, set, remove
	 * @return {Void}
	 */
	static async run(issue_key, input_field, value, action = `add`) {
		const fields         = await Jira.fetchData(`/field`);
		const indexed_fields = {};
		const field_data     = {};
		let output           = null;

		// Post data to jira
		const data = {
			update : {}
		};

		// Normalize the input field
		input_field = input_field.toLowerCase();

		// Index the fields by their name field
		for(let field of fields) {
			const clean_field           = field.name.replace(/\//, ``).toLowerCase();
			indexed_fields[clean_field] = field;
		}

		// Format the data
		if(action === `add`) {
			field_data[action] = {
				name : value
			};
		}
		else {
			field_data[action] = value;
		}

		data.update[indexed_fields[input_field].id] = [field_data];

		// Push the update to jira
		await Jira.fetchData(`/issue/${issue_key}`, {
			method : `PUT`,
			body   : data
		});

		console.log(`Field Saved`);
	}
}

module.exports = Update;
