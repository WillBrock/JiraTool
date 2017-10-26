`use strict`;

const store = require(`data-store`)(`jira`);

class Helper {
	static getIssueKey(issue_key) {
		const issue_prefix = store.get(`issue-key-prefix`);

		if(issue_prefix && !issue_key.match(issue_prefix)) {
			issue_key = `${issue_prefix}-${issue_key}`;
		}

		return issue_key;
	}
}

module.exports = Helper;
