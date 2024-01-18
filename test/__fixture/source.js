export const source = {
	hello: `
	query Hello($name: String!) {
		hello(name: $name)
	}
	`,
	obj: `
	query Obj($c: String) {
		obj(c: $c) {
			a
			b
			c
		}
	}
	`,
}
