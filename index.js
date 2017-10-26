#!/usr/bin/env node
`use strict`;

const program = require(`commander`);
const prompt  = require(`prompt`);
const store   = require(`data-store`)(`jira`);
const tab     = require(`tabtab`)({
	name : `s`
});


// @todo autoload these
const Helper  = require(`./commands/Helper`);
const Show    = require(`./commands/Show`);
const Config  = require(`./commands/Config`);
const Create  = require(`./commands/Create`);
const Jql     = require(`./commands/Jql`);
const Update  = require(`./commands/Update`);

// Initialize jira
program
	.command(`init`)
	.description(`Initial configuration`)
	.action(() => {
		Config.init();
	});

// Refresh all the jira data
program
	.command(`refresh`)
	.description(`Refresh jira fields`)
	.action(() => {

	});

// Setup config settings
program
	.command(`config`)
	.description(`Configuration Settings`)
	.action(() => {
		Config.run();
	});

// Display an issue
program
	.command(`s <issue_key>`)
	.option(`-c, --comments <comments>`, `af`, String)
	.option(`-h, --history <history>`, `asdf`, String)
	.option(`-a, --all <all>`, `Show all data`, String)
	.description(`Show data for an issue`)
	.action((issue_key, comments, history, all) => {
		issue_key = Helper.getIssueKey(issue_key);

		Show.run(issue_key, false);
	});

// Create a new issue
program
	.command(`create`)
	.action(() => {
		Create.run();
	});

// Query issues
program
	.command(`jql <jql>`)
	.action((query) => {
		Jql.run(query);
	});

// Update field data
program
	.command(`update <issue_key> <field> <value>`)
	.action((issue_key, field, value) => {
		issue_key = Helper.getIssueKey(issue_key);

		Update.run(issue_key, field, value);
	});

// Delete field data
program
	.command(`remove <issue_key> <field> <value>`)
	.action(() => {

	});

// Transition issue
program
	.command(`transition <issue_key>`)
	.action((issue_key) => {
		// prompt();
	});

// Show latest activity
program
	.command(`activity`)
	.action(() => {

	});

program
	.command(`foo`)
	.action(() => {

	});

program.parse(process.argv);

tab.on(`s`, (data, done) => {
	done(null, [`foo`, `bar`]);
});

tab.start();
