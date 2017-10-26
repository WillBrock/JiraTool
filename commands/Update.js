`use strict`;

const Jira = require(`../lib/Jira`);

class Update {
	static async run(issue_key, input_field, value) {
		const fields = await Jira.fetchData(`/field`);
		const data   = {
			update : {}
		};

		for(let field of fields) {
			const clean_field = field.name.toLowerCase().replace(/\//, ``);

			if(clean_field === input_field.toLowerCase()) {

				data.update[field.id] = [{
					add : value
				}];

				//data.fields[field.id] = value;

				break;
			}
		}

		console.log(issue_key, data, value);

		await Jira.fetchData(`/issue/${issue_key}`, {
			method : `PUT`,
			body   : data
		});

		console.log(`Field Saved`);
	}
}

module.exports = Update;
