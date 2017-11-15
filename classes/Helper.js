`use strict`;

const store = require(`data-store`)(`jira`);

class Helper {
	/**
	 * Get an actual issue key
	 * A prefix can be specified on setup which this will prepend that to all keys for faster input
	 * @param  {String} issue_key Key to find
	 * @return {String}           Actual jira issue key
	 */
	static getIssueKey(issue_key) {
		const issue_prefix = store.get(`issue-key-prefix`);

		if(issue_prefix && !issue_key.match(issue_prefix)) {
			issue_key = `${issue_prefix}-${issue_key}`;
		}

		return issue_key;
	}
}

module.exports = Helper;
