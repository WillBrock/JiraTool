`use strict`;

const Jira = require(`../lib/Jira`);

class Update {
	static async run(issue_key, input_field, value, action = `add`) {
		const fields         = await Jira.fetchData(`/field`);
		const indexed_fields = {};
		const verb_data      = {};
		const data           = {
			update : {}
		};
		input_field = input_field.toLowerCase();

		for(let field of fields) {
			const clean_field           = field.name.replace(/\//, ``).toLowerCase();
			indexed_fields[clean_field] = field;
		}

		const put_data    = this.getPutData(input_field, value);
		verb_data[action] = put_data;

		console.log()

		data.update[indexed_fields[input_field].id] = [verb_data];

		console.log(issue_key, JSON.stringify(data), value);

		await Jira.fetchData(`/issue/${issue_key}`, {
			method : `PUT`,
			body   : data
		});

		console.log(`Field Saved`);
	}

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

	static getNestedFields() {
		return [
			`Components`,
			`fixVersions`
		];
	}
}

module.exports = Update;
