# sql-query-json

MAJOR WIP - Aims to be a library that can query data from JSON files using SQL<br />
This is a shame of a README, will update this as time goes.<br />
<b>This is not what this will be called eventually <i>HOPEFULLY</i></b>

# Motivation

If you have to build an application that uses SQL in production, you need an SQL db set up locally

This is fine if you've used the stack before. But there are cases where minor issues arise like difference in Engine DBs, charsets, MySQL vs MariaDB.

## Another benefit

JSON data is just prettier looking (both absolutely and relatively when compared to SQL data) <br />

## Painpoint

Generally there exist tools to export SQL data to JSON, but we can't usually manipulate the exported data using SQL. <br />

# Inspiration

- I absolutely love [json-server](https://www.npmjs.com/package/json-server) and how it so seamlessly exposes a REST API given any JSON file.
- However there is no way to work with the data with SQL queries, and that's what this plans to do (lol)

# What this plans to do

Once SQL data has been exported to JSON, we want to be able to manipulate the data using SQL queries. <br />

## How?

(Targets to be) as simple as json-server

```bash
$ sql-query-json --watch file.json
```

And this should be enough to start it up

## How will I query?

Just how GraphQL servers work, they expose an endpoint where query strings can be sent and it will return the response based on the query.

# Data format

Ideally is structured data

```json
{
  "table1": [
    {
      "column1": "value",
      "column2": "value",
      "column3": "value"
    },
    {
      "column1": "value",
      "column2": "value",
      "column3": "value"
    }
  ],
  "table2": [{}, {}]
}
```

## What about NoSQL?

Could be dealt with how NoSQL databases deal with query strings when a particular key is not found - ignore it. But this is meant to be a configurable option.

# Contributing

Fork and open a PR against the dev branch

# Roadmap

- v0.1.0 - select with orderby, where, limit
- v0.2.0 - update, delete
- v0.3.0 - insert
- v0.4.0 - create, drop
- v0.5.0 - join
- v1.0.0 - issue warnings with type checks for SQL

Currently on v0.0.0 :P
