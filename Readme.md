# ip-to-geo CLI
> A simple CLI to get the estimated latitude and longitude coordinates for an IP address

**Warning:** This CLI uses the free, HTTP-only version of the IPStack service. Any IPs you pass through it (and the returned geolocation information) will be transmitted insecurely.

**Note:** The installation documentation in this Readme is only provided for Unix-like systems (Mac / Linux) at this time.

## Installation
1. [Install Docker](https://www.docker.com/get-started/) on your machine
2. Run the command: `docker pull miketromba/ip-to-geo-cli:latest` to pull the latest version from Docker Hub

## Usage
1. Get a free [IPStack API key](https://ipstack.com/api-key)
<!-- and add it to an environment variable called `IPSTACK_API_KEY` -->
<!-- - On Mac / Linux, you can do this by running the following command in your command line: `export IPSTACK_API_KEY=[your api key]` (remove the brackets) -->

2. Run the CLI using the following command to retrieve coordinates for a given IP address. (**Make sure to replace "your_api_key"**)

```sh
docker run --rm -it -e IPSTACK_API_KEY=your_api_key miketromba/ip-to-geo-cli get-coords 1.1.1.1
```
Which will output:
```c
Latitude: 34.0453
Longitude: -118.2413
```
> **Note:** It's important to include the `--rm` flag so that the container is automatically removed after the CLI is invoked.


## Output Format
You can control the output format of the `get-coords` command for easier parsing by specifying one of the following flags:
- `-c` or `--comma-delimited` - Outputs the coordinates on a single line, in a comma-delimited format. For example: 
```c
34.0453,-118.2413
```
- `-j` or `--json` - Outputs the coordinates in a JSON format. For example: 
```json
{"latitude":34.0453,"longitude":-118.2413}
```

## Help
Run the CLI with the `help` command for additional documentation.
```sh
docker run --rm -it miketromba/ip-to-geo-cli help
```

## Making the CLI easier to run
It's a bit annoying to type out the entire docker command in order to work with the CLI. Because of this, we recommend installing this shell script: [`ip-to-geo.sh`](/ip-to-geo.sh) and adding it to your PATH instead.
On Mac/Linux machines, you can run the command below to install it:
```sh
sudo curl -o /usr/local/bin/ip-to-geo https://raw.githubusercontent.com/miketromba/ip-to-geo-cli/main/ip-to-geo.sh && sudo chmod +x /usr/local/bin/ip-to-geo
```
Then, add the ip-to-geo.sh file to your machine's PATH:

Bash:
```sh
echo 'export PATH="/usr/local/bin:$PATH"' >> ~/.zshrc && source ~/.zshrc
```
Zsh:
```sh
echo 'export PATH="/usr/local/bin:$PATH"' >> ~/.bashrc && source ~/.bashrc
```
> **Note:** You may need to re-start your terminal after adding the script to your PATH.
So that you can simplify the command to:
```sh
ip-to-geo get-coords 1.1.1.1
```


# Development

## Installing for development
1. Clone the repository
2. [Install pnpm](https://pnpm.io/installation) if you have not already.
3. Run `pnpm i` to install all dependencies.

## Running the CLI locally
1. Run `pnpm build` to build the CLI, or `pnpm dev` to start a process which will automatically re-build each time you update a file.
2. Add your [IPStack API key](https://ipstack.com/api-key) to an environment variable called `IPSTACK_API_KEY`
    - On Mac / Linux, you can do this by running the following command in your command line: `export IPSTACK_API_KEY=[your api key]` (remove the brackets)

3. Run `node src/index.ts [options] [command] [argument]` to invoke the CLI

## Publishing a new version
1. Increment semver-compliant version in package.json according to changes
2. Push changes to GitHub (GitHub actions will automatically build and publish an image to Docker Hub with the new version)

# Future Improvements
- Support HTTPS queries to the IPStack API (HTTPS queries to IPStack require a paid plan)
- Add tests as needed
- Add eslint for tighter constraints on code quality
- Add .prettierrc & .editorconfig files for establishing code style defaults
- Improve the developer experience so that users don't have to type out the entire Docker command (and their API key) each time they want to invoke the CLI. Possibly provide some kind of alias script to invoke the CLI and store the user's API credential securely in a file on their machine. Possibly provide a command like `ip-to-geo config` (AWS CLIs tend to follow this pattern) which will ask them to paste their API key and automatically save it for them. Finally, adjust the docker command to bind that config file as a volume.
- Explore migrating to bun / deno for improved image size?
- Adjust "Making the CLI easier to run" portion of Readme to add documentation for Windows users.