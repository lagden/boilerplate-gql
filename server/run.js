import process from 'node:process'
import la from '@tadashi/local-access'
import app from './app.js'
import * as debug from './lib/debug.js'

const {
	PORT = 5001,
	VERSION = 'dev',
} = process.env

const {
	local,
	network,
} = la({port: PORT})

app.listen(PORT, () => {
	debug.info('Server listening')
	debug.info('----------------')
	debug.info(`Local:    ${local}`)
	debug.info(`Network:  ${network}`)
	debug.info('----------------')
	debug.info(`Version:  ${VERSION}`)
})
