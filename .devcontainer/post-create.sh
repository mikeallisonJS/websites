curl -fsSL https://bun.sh/install | bash -s "bun-v1.1.15"
git config diff.lockb.textconv bun
git config diff.lockb.binary true

bun install
bun install -g @withgraphite/graphite-cli@stable

# Remove the nx-native-file-cache folder to avoid permission issues with the nx cli
sudo rm -rf /tmp/nx-native-file-cache/
