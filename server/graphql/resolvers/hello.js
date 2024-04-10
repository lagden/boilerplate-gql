import {GraphQLError} from 'graphql'

function hello(_root, {name = 'World'}) {
	if (name === 'xxx') {
		throw new GraphQLError('The name "xxx" is not permitted.', {
			extensions: {
				http: {
					status: 403,
				},
			},
		})
	}
	return `Hello ${name}`
}

const Query = {
	hello,
}

export {Query}
