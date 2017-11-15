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
		const verb_data      = {};
		const data           = {
			update : {}
		};

		input_field = input_field.toLowerCase();

		// Index the fields by their name field
		for(let field of fields) {
			const clean_field           = field.name.replace(/\//, ``).toLowerCase();
			indexed_fields[clean_field] = field;
		}

		const put_data    = this.getPutData(input_field, value);
		verb_data[action] = put_data;

		data.update[indexed_fields[input_field].id] = [verb_data];

		console.log(issue_key, JSON.stringify(data), value);

		await Jira.fetchData(`/issue/${issue_key}`, {
			method : `PUT`,
			body   : data
		});

		console.log(`Field Saved`);
	}

	/**
	 * Get formatted data to pass to the jira api
	 * Jira sometimes needs a nested object with a name property
	 * @param  {String} input_field  Field to update
	 * @param  {String} value        Value of the field
	 * @return {Object}              Formatted data for the PUT request to jira
	 */
	static getPutData(input_field, value) {
		const nested_fields = this.getNestedFields().map((value) => {
			return value.toLowerCase();
		});

		let output = {};

		if(nested_fields.includes(input_field)) {
			output = {
				name : value
			};
		}
		else {
			output = value;
		}

		return output;
	}

	/**
	 * Fields that need to be nested for the jira api, not sure if this is a bug or not with jira
	 * @return {Array} Fields to nest
	 */
	static getNestedFields() {
		return [
			`Components`,
			`fixVersions`
		];
	}
}

module.exports = Update;
