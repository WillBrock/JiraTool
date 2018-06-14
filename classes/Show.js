`use strict`;

const Jira      = require(`../lib/Jira`);
const Table     = require(`cli-table3`);
const columnify = require('columnify');
const chalk     = require(`chalk`);
const moment    = require(`moment`);
const log       = console.log;

class Show {
	/**
	 * Show a jira issue
	 * @param  {String}  issue_key        Issue to show
	 * @param  {Boolean} exclude_comments [description]
	 * @return {Void}
	 */
	static async run(issue_key, exclude_comments = false) {
		const [ issue, all_fields ] = await Promise.all([
			Jira.fetchData(`/issue/${issue_key}`),
			Jira.fetchData(`/field`)
		]);

		// Display the issue
		this.display(issue, all_fields, exclude_comments);
	}

	/**
	 * Display a single issue
	 * @param  {Object}  issue            All issue data that is returned from jira
	 * @param  {Array}   all_fields       All fields for the current site
	 * @param  {Boolean} exclude_comments Show or display comments on the issue
	 * @return {Void}
	 */
	static display(issue, all_fields, exclude_comments = false) {
		let comments         = [];
		const line_length    = 175;
		const indexed_fields = {};
		const issue_fields   = issue.fields;
		const custom_fields  = [];

		// Set comment table headers
		const comment_table  = new Table({
			head      : [`Author`, `Created`, `Comment`],
			colWidths : [20, 30, 121],
			wordWrap  : true
		});

		if(!exclude_comments) {
			comments = issue_fields.comment.comments;
		}

		// Index fields by their id
		for(let field of all_fields) {
			indexed_fields[field.id] = field.name;
		}

		// Get comments
		for(let comment of comments) {
			comment_table.push([
				comment.author.name,
				moment(comment.created).format(`MM/DD/YYYY hh:mma`),
				comment.body.replace(/(\t|\r)/g, ``)
			]);
		}

		// Get custom fields
		for(let key in issue_fields) {
			const field = issue_fields[key];
			let display = null;

			// Only get custom fields
			if(!key.match(/customfield_/)) {
				continue;
			}

			if(!field || indexed_fields[key] === `Development`) {
				continue;
			}

			if(Array.isArray(field) && field.length > 0) {
				display = field[0].value;
			}
			else if(typeof field === `object`) {
				display = field.value;
			}
			else {
				display = field;
			}

			if(!display) {
				continue;
			}

			custom_fields.push({
				name  : indexed_fields[key],
				value : display
			});
		}

		// Draw some lines for better display
		this.drawLine(line_length);
		this.drawLine(line_length);
		this.drawLine(line_length);

		// Set the header data
		const header = [{
			issue_key    : chalk.bold(issue.key),
			assignee     : chalk.bold(issue_fields.assignee.name),
			status       : chalk.bold(issue_fields.status.name),
			fix_versions : chalk.bold(issue_fields.fixVersions.map((value) => value.name).join(`, `)),
			components   : chalk.bold(issue_fields.components.map((value) => value.name).join(`, `)),
			labels       : chalk.bold(issue_fields.labels.join(`, `)),
		}];

		// Set Summary and Description data
		const data = [
			{
				text : `-`.repeat(line_length)
			},
			{
				text : chalk.green.bold(issue_fields.summary)
			},
			{
				text : `-`.repeat(line_length)
			},
			{
				text : chalk.magenta.bold(issue_fields.description)
			},
			{
				text : `-`.repeat(line_length)
			},
		];

		if(!exclude_comments) {
			log(comment_table.toString());

			this.drawLine(line_length);
		}

		// Display custom field data
		log(columnify(custom_fields, {
			maxWidth    : line_length,
			showHeaders : false,
		}));

		this.drawLine(line_length);

		// Display header data
		log(columnify(header, {
			minWidth       : 20,
			columnSplitter : ` | `
		}));

		// Display summary and description data
		log(columnify(data, {
			maxWidth    : line_length,
			showHeaders : false,
		}));
	}

	/**
	 * Draw a line for the terminal ouput
	 * @param  {Integer} length Length of the line
	 * @return {Void}
	 */
	static drawLine(length = 175) {
		log(`-`.repeat(length));
	}
}

module.exports = Show;
