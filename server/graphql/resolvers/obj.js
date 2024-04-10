function obj(_root, args) {
	const {c} = args
	return {
		a: 123,
		b: 'foo',
		c: {c},
	}
}

const Query = {
	obj,
}

export {Query}
