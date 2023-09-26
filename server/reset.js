import process from 'node:process'
import * as debug from '@tadashi/debug'

const {
	APP_ENV,
	GITLAB_ENVIRONMENT_NAME,
} = process.env

/* c8 ignore next */
process.env.APP_ENV = GITLAB_ENVIRONMENT_NAME ?? APP_ENV ?? 'production'

debug.info('process.env no reset', process.env)
