bun install
bun install -g prettier @withgraphite/graphite-cli@stable

# Remove the nx-native-file-cache folder to avoid permission issues with the nx cli
sudo rm -rf /tmp/nx-native-file-cache/
