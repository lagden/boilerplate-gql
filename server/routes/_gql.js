import {graphql} from 'graphql'
import bodyparser from 'koa-bodyparser'
import Router from '@koa/router'
import {uuid} from '@tadashi/common'
import schema from '../graphql/schema.js'

const router = new Router()

async function gql(ctx) {
	// prettier-ignore
	let {
		query,
		variables,
		source,
		variableValues,
		operationName,
	} = ctx.request.body

	source = source ?? query
	variableValues = variableValues ?? variables

	const response = await graphql({
		schema,
		source,
		variableValues,
		operationName,
		contextValue: ctx,
	})

	if (response.errors) {
		const mapError = response.errors.map(error => ({
			/* c8 ignore start */
			status: error?.extensions?.http?.status ?? 400,
			message: error?.extensions?.message ?? error?.message ?? 'Bad Request',
			log: {
				level: 'error',
				extensions_status_code: error?.extensions?.http?.status ?? 400,
				extensions_message: error?.extensions?.message ?? '',
				message: error?.message ?? 'Bad Request',
				tracking_error: uuid(false),
			},
			/* c8 ignore stop */
		}))

		// Get first error
		const [{status = 400, message = 'Bad Request'}] = mapError

		const _error = new Error(message)
		_error.log = mapError.map(item => item.log)

		ctx.status = status
		ctx.app.emit('error', _error)
	}

	ctx.body = response
}

router.post('/gql', bodyparser(), gql)

export default router
