import {graphql} from 'graphql'
import bodyparser from 'koa-bodyparser'
import Router from '@koa/router'
import schema from '../graphql/schema.js'

const router = new Router()

async function gql(ctx) {
	let {
		query,
		variables,
		//
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
		const _errors = []
		for (const error of response.errors) {
			// const {originalError} = error
			// const {message: messageOriginal} = originalError ?? {}
			// if (messageOriginal) {
			// 	_errors.push({message: messageOriginal})
			// }

			const {message} = error
			if (message) {
				_errors.push({message})
			}
		}

		ctx.throw(500, 'Internal Server Error', {
			graphql: {
				errors: _errors,
			},
		})
	}

	ctx.body = response
}

router
	.post('/gql', bodyparser(), gql)

export default router
