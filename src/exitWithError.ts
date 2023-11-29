// This is a cleaner way to exit the program with an error message, as opposed
// to throwing an error and catching it in the main program. This is because
// throwing an error will print a stack trace, which is not desirable in this
// case. The exitWithError function prints the error message to stderr and exits
// the program with a non-zero exit code. The exit code is optional, and
// defaults to 1.
export function exitWithError(message: string, exitCode = 1) {
	console.error(`Error: ${message}`)
	process.exit(exitCode)
}
