function hello(_root, {name = 'World'}) {
	return `Hello ${name}`
}

const Query = {
	hello,
}

export {Query}
