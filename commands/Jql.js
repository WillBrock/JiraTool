`use strict`;

const Jira = require(`../lib/Jira`);
const Show = require(`./Show`);

class Jql {
	static async run(query) {
		query = encodeURIComponent(query);

		const [ issues, all_fields ] = await Promise.all([
			Jira.fetchData(`/search?jql=${query}`),
			Jira.fetchData(`/field`)
		]);

		for(let issue of issues.issues) {
			Show.display(issue, all_fields, true);
		}
	}
}

module.exports = Jql;
