#!/usr/bin/env node
`use strict`;

const program    = require(`commander`);
const prompt     = require(`prompt`);
const store      = require(`data-store`)(`jira`);
const Config     = require(`./classes/Config`);
const Helper     = require(`./classes/Helper`);
const Show       = require(`./classes/Show`);
const Jql        = require(`./classes/Jql`);
const Update     = require(`./classes/Update`);
const Transition = require(`./classes/Transition`);

// Initialize jira
program
	.command(`init`)
	.description(`Initial configuration`)
	.action(() => {
		Config.run();
	});

// Display an issue
program
	.command(`s <issue_key>`)
	.description(`Show data for an issue`)
	.action((issue_key, comments, history, all) => {
		issue_key = Helper.getIssueKey(issue_key);

		try {
			Show.run(issue_key, false);
		}
		catch(error) {
			console.log(error.message);
		}
	});

// Query issues
program
	.command(`jql <jql>`)
	.description(`Run jql query`)
	.action((query) => {
		try {
			Jql.run(query);
		}
		catch(error) {
			console.log(error.message);
		}
	});

// Add field data
program
	.command(`add <issue_key> <field> <value>`)
	.description(`Add data to a field`)
	.action((issue_key, field, value) => {
		issue_key = Helper.getIssueKey(issue_key);

		try {
			Update.run(issue_key, field, value, `add`);
		}
		catch(error) {
			console.log(error.message);
		}
	});

// Set field data
program
	.command(`set <issue_key> <field> <value>`)
	.description(`Set field data`)
	.action((issue_key, field, value) => {
		issue_key = Helper.getIssueKey(issue_key);

		try {
			Update.run(issue_key, field, value, `set`);
		}
		catch(error) {
			console.log(error.message);
		}
	});

// Remove field data
program
	.command(`remove <issue_key> <field> <value>`)
	.description(`Remove data from a field`)
	.action((issue_key, field, value) => {
		issue_key = Helper.getIssueKey(issue_key);

		try {
			Update.run(issue_key, field, value, `remove`);
		}
		catch(error) {
			console.log(error.message);
		}
	});

// Transition issue
program
	.command(`transition <issue_key> <transition>`)
	.description(`Transition an issue`)
	.action((issue_key, transition) => {
		issue_key = Helper.getIssueKey(issue_key);

		try {
			Transition.run(issue_key, transition);
		}
		catch(error) {
			console.log(error.message);
		}
	});

program.parse(process.argv);
