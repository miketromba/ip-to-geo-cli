#!/bin/bash
# Check if IPSTACK_API_KEY is set
if [ -z "$IPSTACK_API_KEY" ]; then
    echo "Error: IPSTACK_API_KEY environment variable is not set."
    exit 1
fi
# Run the container
docker run --rm -it -e IPSTACK_API_KEY=$IPSTACK_API_KEY miketromba/ip-to-geo-cli "$@"
