import {URL} from 'node:url'
import {loadFiles} from '@graphql-tools/load-files'
import {createSchema} from 'graphql-yoga'
import {GraphQLJSON} from 'graphql-scalars'
import merge from 'lodash.merge'

const _typeDefs = new URL('type-defs/*.graphql', import.meta.url).href
const _resolvers = new URL('resolvers/*.js', import.meta.url).href

// prettier-ignore
const [
	typeDefs,
	resolversModules,
] = await Promise.all([
	loadFiles(_typeDefs),
	loadFiles(_resolvers),
])

const resolvers = {}
for (const mod of resolversModules) {
	merge(resolvers, mod)
}

const schema = createSchema({
	typeDefs,
	resolvers: merge(resolvers, {
		JSON: GraphQLJSON,
	}),
})

export default schema
