`use strict`;

const btoa      = require(`btoa`);
const nodeFetch = require(`node-fetch`);
const store     = require(`data-store`)(`jira`);

class Jira {
	/**
	 * Get the users jira url
	 * @return {String} Jira url
	 */
	static getUrl() {
		const url = store.get(`url`);

		if(!url) {
			throw new Error(`No jira url is setup. Please run jira init.`);
		}

		return url;
	}

	/**
	 * Get the api url
	 * @return {String} Api url
	 */
	static getApiUrl() {
		return `${this.getUrl()}/rest/api/2`;
	}

	/**
	 * Auth key for the jira api
	 * @return {String} Base64-encoded auth string
	 */
	static getAuthKey() {
		const email    = store.get(`email`);
		const password = store.get(`password`);

		if(!email || !password) {
			throw new Error(`No email or password setup. Please run jira init.`);
		}

		return btoa(`${email}:${password}`);
	}

	/**
	 * Fetch data from the api. PUT, POST, GET
	 * @param  {String} path Api path
	 * @param  {Object} data Request for the api
	 * @return {String}      Data from the api call
	 */
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

			// Convert data to json if a GET request
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
