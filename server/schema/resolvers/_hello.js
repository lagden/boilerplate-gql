'use strict'

function hello(_root, {name = 'World'}) {
	return `Hello ${name}`
}

module.exports = {
	Query: {
		hello
	}
}
