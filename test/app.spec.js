import {before, after, test} from 'node:test'
import assert from 'node:assert/strict'
import got from 'got'
import {start, stop} from './__helper/server.js'
import {source} from './__fixture/source.js'

const headers = {
	accept: 'application/graphql-response+json, application/json, multipart/mixed',
}
let server
let prefixUrl

before(async () => {
	;({server, prefixUrl} = await start())
})

after(async () => {
	await stop(server)
})

test('hello', async () => {
	const json = {
		query: source.hello,
		variables: {name: 'Sabrina'},
		operationName: 'Hello',
	}

	const r = await got.post(`${prefixUrl}/gql`, {
		headers,
		throwHttpErrors: false,
		responseType: 'json',
		json,
	})

	const {hello} = r.body.data

	assert.equal(r.statusCode, 200)
	assert.equal(hello, 'Hello Sabrina')
})

test('obj', async () => {
	const json = {
		query: source.obj,
		variables: {c: 'Bar'},
		operationName: 'Obj',
	}

	const r = await got.post(`${prefixUrl}/gql`, {
		headers,
		throwHttpErrors: false,
		responseType: 'json',
		json,
	})

	assert.equal(r.statusCode, 200)
	assert.equal(r.body.data.obj.c.c, 'Bar')
})

test('error', async () => {
	const json = {
		query: source.hello,
		variables: {name: 'Sabrina'},
		operationName: 'Nope',
	}

	const r = await got.post(`${prefixUrl}/gql`, {
		headers,
		throwHttpErrors: false,
		responseType: 'json',
		json,
	})

	assert.equal(r.statusCode, 400)
	assert.equal(r.body.errors[0].message, 'Unknown operation named "Nope".')
})

test('error xxx', async () => {
	const json = {
		query: source.hello,
		variables: {name: 'xxx'},
		operationName: 'Hello',
	}

	const r = await got.post(`${prefixUrl}/gql`, {
		headers,
		throwHttpErrors: false,
		responseType: 'json',
		json,
	})

	assert.equal(r.statusCode, 403)
	assert.equal(r.body.errors[0].message, 'The name "xxx" is not permitted.')
})
