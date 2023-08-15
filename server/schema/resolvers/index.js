import {URL} from 'node:url'
import {readdirSync} from 'node:fs'
import merge from 'lodash.merge'

const __dirname = new URL('.', import.meta.url)

const pattern = /^_[\w-]+\.js/
const files = readdirSync(__dirname)
	.filter(f => pattern.test(f))
	.map(f => new URL(f, __dirname).href)
const resolvers = {}

const imports = []
for (const file of files) {
	imports.push(import(file))
}

for await (const mod of imports) {
	merge(resolvers, mod)
}

export default resolvers
