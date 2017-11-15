# Jira command line tool

Allows viewing, editing, updating and deleting jira content as if it was done on the Jira website.

## Features

* View issue data
* Update/Add/Delete issue data
* View issues from JQL query
* Create new issues
* View issues by user
* Update/Add versions

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

# Quick Start

Display data from an issue

```
jira show 12345
```

Display issues from a JQL query

```
jira jql "fixVersion = 8.6.0 AND component IN (Foo)"
```

Add a component

```
jira add 12345 component Foo
```

Update a custom field

```
jira set 12345 "Some Random Field" "FooBar"
```

# Init

# Config

# Show


# Config

Below is an example config file.

All config options are displayed below.

Config options
