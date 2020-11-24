'use strict'

const {readdirSync} = require('fs')
const {join} = require('path')
// const merge = require('lodash.merge')

const pattern = /^_[\w-_]+\.js/
const files = readdirSync(__dirname).filter(f => pattern.test(f)).map(f => join(__dirname, f))
let resolvers = {}

for (const file of files) {
	resolvers = {...resolvers, ...require(file)}
	// merge(resolvers, require(file))
}

module.exports = resolvers
