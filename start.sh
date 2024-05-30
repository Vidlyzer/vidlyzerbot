#!/bin/bash

# Clone repository if it doesn't exist, otherwise pull latest changes
if [ -d .git ]; then
    git pull
else
    git clone https://${GIT_USERNAME}:${GIT_ACCESS_TOKEN}@github.com/${GIT_REPO_ADDRESS} /home/container
    cd /home/container
    git checkout ${INSTALL_BRANCH}
fi

# Install Node.js packages if package.json exists
if [ -f /home/container/package.json ]; then
    cd /home/container
    npm install
fi

# Export custom environment variables
if [[ ! -z ${CUSTOM_ENVIRONMENT_VARIABLES} ]]; then
    vars=$(echo ${CUSTOM_ENVIRONMENT_VARIABLES} | tr ";" "\n")
    for line in $vars; do
        export $line
    done
fi

# Run the bot using the specified command
cd /home/container
npm start
