`use strict`;

const prompt = require(`prompt`);
const store  = require(`data-store`)(`jira`);

class Config {
	/**
	 * Start the config prompt and store the entered values
	 * @return {Void}
	 */
	static run() {
		prompt.start();

		prompt.get(this.schema, (error, result) => {
			store.set(result);
		});
	}

	/**
	 * Display fields for initial configration
	 * @return {Object} Fields to prompt the user to enter
	 */
	static get schema() {
		return {
			properties : {
				url : {
					description : `Jira url`,
					required : true
				},

				email : {
					required : true
				},

				password : {
					required : true,
					hidden   : true
				},

				'issue-key-prefix' : {
					description : `Issue prefix, if any. e.g. FOO-`
				}
			}
		}
	}
}

module.exports = Config;
