`use strict`;

const prompt = require(`prompt`);
const store  = require(`data-store`)(`jira`);

class Config {
	static run() {

	}

	static init() {
		prompt.start();

		prompt.get(this.schema, (error, result) => {
			store.set(result);
		});
	}

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
					description : `Issue prefix, if any. e.g. FOCUS-`
				}
			}
		}
	}
}

module.exports = Config;
