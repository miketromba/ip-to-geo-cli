#!/usr/bin/env node
import { Command } from 'commander'
import { isIP } from 'net'
import { getIPCoordinates } from './ipstack'
import { exitWithError } from './exitWithError'

const program = new Command()

program
	.name('ip-to-geo')
	.description('CLI to get geolocation coordinates for an IP address')
	.version('1.0.0')

program
	.command('get-coords')
	.description('Get geolocation coordinates for an IP address')
	.argument('<ip>', 'IP address to get coordinates for', ip => {
		if (!isIP(ip)) exitWithError(`Invalid IP format: ${ip}`)
		return ip
	})
	.option(
		'-j --json',
		'Output result as JSON string (e.g. {"latitude":123.456,"longitude":-789.012})'
	)
	.option(
		'-c --comma-delimited',
		'Output result as comma-delimited string (e.g. 123.456,-789.012)'
	)
	.action(async (ip, opts: { json?: boolean; commaDelimited?: boolean }) => {
		const { latitude, longitude, success, error } = await getIPCoordinates(
			ip
		)
		if (!success && error) {
			return exitWithError(
				`(${error.code} - ${error.type}) ${error.info}`
			)
		}
		if (opts['json']) {
			console.log(JSON.stringify({ latitude, longitude }))
		} else if (opts['commaDelimited']) {
			console.log(`${latitude},${longitude}`)
		} else {
			console.log(`Latitude: ${latitude}\nLongitude: ${longitude}`)
		}
	})

program.parse(process.argv)
