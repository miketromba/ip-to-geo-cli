import { exitWithError } from './exitWithError'

interface IPStackResponse {
	success?: boolean
	error?: {
		code: number
		type: string
		info: string
	}
	latitude: number
	longitude: number
}

export async function getIPCoordinates(ip: string): Promise<IPStackResponse> {
	if (!process.env.IPSTACK_API_KEY) {
		exitWithError('Please set the IPSTACK_API_KEY environment variable.')
	}
	if (!ip) throw new Error('No IP provided')
	return fetch(
		// Note: we supply the fields query parameter to optimize the response size
		`http://api.ipstack.com/${ip}?access_key=${process.env.IPSTACK_API_KEY}&fields=latitude,longitude`
	).then(res => res.json() as Promise<IPStackResponse>)
}
