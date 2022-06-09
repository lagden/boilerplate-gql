import {URL} from 'node:url'
import {loadSchema} from '@graphql-tools/load'
import {GraphQLFileLoader} from '@graphql-tools/graphql-file-loader'
import {makeExecutableSchema} from '@graphql-tools/schema'
import resolvers from './resolvers/index.js'

const _schema = new URL('schema.graphql', import.meta.url).href
const typeDefs = await loadSchema(_schema, {
	loaders: [
		new GraphQLFileLoader(),
	],
})

const schema = makeExecutableSchema({
	typeDefs,
	resolvers,
})

export default schema
