'use strict'

const test = require('ava')
const app = require('./helper/server')

const query = `
query Hello($name: String!) {
  hello(name: $name)
}`

test('hello', async t => {
	const data = {}
	data.query = query
	data.variables = {name: 'Sabrina'}
	data.operationName = 'Hello'
	const r = await app
		.post('/gql')
		.set('content-type', 'application/json')
		.send(data)

	const {hello} = r.body.data
	t.is(r.status, 200)
	t.is(hello, 'Hello Sabrina')
})
