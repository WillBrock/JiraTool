`use strict`;

const prompt = require(`prompt`);

class Create {
	static run() {
		prompt.start();

		prompt.get(this.schema, (error, result) => {
			// Input the data to jira

		});
	}

	static get schema() {
		return {
			properties : {
				summary : {
					description : `Ticket Summary`,
					required    : true,
				},

				description : {
					description : `Ticket Description`,
					required    : true,
				}
			}
		}
	}
}

module.exports = Create;
