# Jira command line tool

This is an experimental command line tool that allows viewing, editing, updating and deleting jira content as if it was done on the Jira website.

## Features

* View issue data
* View issues from JQL query
* Update/Add/Delete issue data
* Transition issues

# Install

```
npm install -g jira-tool
```

# Available Commands

`s`
`jql`
`add`
`set`
`remove`
`init`

# Todo

* Add autocompletion for available fields and transitions
* Add create issue

# Quick Start

Display data from an issue

```
jira s 12345
```

Or

```
jira s KEY-12345
```

Display issues from a JQL query

```
jira jql "fixVersion = 1.6.0 AND component IN (Foo, Bar, Baz)"
```

Add a component

```
jira add 12345 component Foo
```

Remove a Fix Version

```
jira remove 12345 "Fix Version" "1.8.0"
```

Update a custom field

```
jira set 12345 "Branch Name" "FooBar"
```

# Init

This prompts the user for the configuration of the jira account

`url` Url for jira
`username` Jira username
`password` Jira password
`issue-key-prefix` Prefix for an issue key. e.g if issue key is FOO-12345 then FOO can be entered so 12345 can be used on the command line

# Show

`jira s 12345`

Display data from a single jira issue

# Jql

`jira jql "fixVersion IN (1.3.0, 1.4.0) AND component = Foo"`

Query Jira for a specified list of issues

# Add

Add data to a specific field

# Set

Set data for a specific field

# Remove

Remove data from a specific field
