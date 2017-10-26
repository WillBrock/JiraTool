`use strict`;

const btoa      = require(`btoa`);
const nodeFetch = require(`node-fetch`);
const store     = require(`data-store`)(`jira`);

class Jira {
	static getUrl() {
		return store.get(`url`);
	}

	static getApiUrl() {
		return `${this.getUrl()}/rest/api/2`;
	}

	static getAuthKey() {
		const email    = store.get(`email`);
		const password = store.get(`password`);

		if(!email || !password) {
			throw new Error(`No email or password setup`);
		}

		return btoa(`${email}:${password}`);
	}

	static async fetchData(path, data = {}) {
		let result = null;

		// Default to GET if no method is passed in
		if(!data.method) {
			data.method = `GET`;
		}

		// Set Auth headers
		if(!data.headers) {
			data.headers = {
				'Authorization' : `Basic ${this.getAuthKey()}`,
				'Content-Type'  : `application/json`
			};
		}

		// Format the body
		if(data.body) {
			data.body = JSON.stringify(data.body);
		}

		try {
			const tmp = await nodeFetch(`${this.getApiUrl()}${path}`, data);

			if(data.method.toUpperCase() !== `GET`) {
				result = await tmp.text();
			}

			if(data.method.toUpperCase() === `GET`) {
				result = await tmp.json();
			}
		}
		catch(e) {
			throw new Error(e.message);
		}

		return result;
	}
}

module.exports = Jira;
