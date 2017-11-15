#!/usr/bin/env node
`use strict`;

const program = require(`commander`);
const prompt  = require(`prompt`);
const store   = require(`data-store`)(`jira`);

// @todo autoload these
const Helper = require(`./commands/Helper`);
const Show   = require(`./commands/Show`);
const Config = require(`./commands/Config`);
const Create = require(`./commands/Create`);
const Jql    = require(`./commands/Jql`);
const Update = require(`./commands/Update`);

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
	.command(`transition <issue_key>`)
	.action((issue_key) => {
		// prompt();
	});

program.parse(process.argv);
