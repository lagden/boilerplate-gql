import Router from '@koa/router'
import {createYoga} from 'graphql-yoga'
import schema from '../graphql/schema.js'

const yoga = createYoga({
	schema,
	graphqlEndpoint: '/gql-yoga',
	healthCheckEndpoint: '/live',
	logging: false,
})

const router = new Router()

async function gql(ctx) {
	const response = await yoga.handleNodeRequest(ctx.request, ctx)

	ctx.status = response.status
	for (const [key, value] of response.headers.entries()) {
		ctx.append(key, value)
	}

	ctx.body = response.body
}

router
	.post('/gql-yoga', gql)

export default router
