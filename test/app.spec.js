import test from 'ava'
import got from 'got'
import server from './helper/server.js'

const source = {}
source.hello = `
query Hello($name: String!) {
	hello(name: $name)
}
`
source.obj = `
query Obj($c: String) {
	obj(c: $c) {
		a
		b
		c
	}
}
`

test.before(async t => {
	t.context.baseUrl = await server()
})

test('hello', async t => {
	const json = {}
	json.source = source.hello
	json.variableValues = {name: 'Sabrina'}
	json.operationName = 'Hello'
	const r = await got.post(`${t.context.baseUrl}/gql`, {
		throwHttpErrors: false,
		responseType: 'json',
		json,
	})

	const {hello} = r.body.data
	t.is(r.statusCode, 200)
	t.is(hello, 'Hello Sabrina')
})

test('hello old way', async t => {
	const json = {}
	json.query = source.hello
	json.variables = {name: 'Sabrina'}
	json.operationName = 'Hello'
	const r = await got.post(`${t.context.baseUrl}/gql`, {
		throwHttpErrors: false,
		responseType: 'json',
		json,
	})

	const {hello} = r.body.data
	t.is(r.statusCode, 200)
	t.is(hello, 'Hello Sabrina')
})

test('error', async t => {
	const json = {}
	json.source = source.hello
	json.variableValues = {name: 'Sabrina'}
	json.operationName = 'Nope'
	const r = await got.post(`${t.context.baseUrl}/gql`, {
		throwHttpErrors: false,
		responseType: 'json',
		json,
	})

	t.is(r.statusCode, 500)
	t.snapshot(r.body)
})

test('obj', async t => {
	const json = {}
	json.source = source.obj
	json.variableValues = {c: 'Bar'}
	json.operationName = 'Obj'
	const r = await got.post(`${t.context.baseUrl}/gql`, {
		throwHttpErrors: false,
		responseType: 'json',
		json,
	})

	t.is(r.statusCode, 200)
	t.snapshot(r.body)
})

test('yoga', async t => {
	const json = {}
	json.query = source.obj
	json.variables = {c: 'Bar'}
	json.operationName = 'Obj'
	const r = await got.post(`${t.context.baseUrl}/gql-yoga`, {
		throwHttpErrors: false,
		responseType: 'json',
		json,
	})

	t.is(r.statusCode, 200)
	t.snapshot(r.body)
})
