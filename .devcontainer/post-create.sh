#!/bin/bash

pnpm install
sudo npm i -g prettier @withgraphite/graphite-cli@stable vercel

# Remove the nx-native-file-cache folder to avoid issues with the nx cli
sudo rm -rf /tmp/nx-native-file-cache/