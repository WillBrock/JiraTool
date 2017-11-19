`use strict`;

const Jira = require(`../lib/Jira`);

class Transition {
	/**
	 * Transition a single jira issue
	 * @param  {String} issue_key         Key of the issue to transition
	 * @param  {String} transition_string Transition value
	 * @return {Void}
	 */
	static async run(issue_key, transition_string) {
		let transition_id = false;

		// Get available transitions for the issue
		const transitions = await Jira.fetchData(`/issue/${issue_key}/transitions`);

		for(let transition of transitions.transitions) {
			if(transition.name.toLowerCase() !== transition_string.toLowerCase()) {
				continue;
			}

			transition_id = transition.id;
		}

		if(!transition_id) {
			throw new Error(`Transition ${transition_string} is not available on this issue.`);
		}

		const post_data = {
			transition : {
				id : transition_id
			}
		};

		await Jira.fetchData(`/issue/${issue_key}/transitions`, {
			method : `POST`,
			body   : post_data
		});
	}
}

module.exports = Transition;
