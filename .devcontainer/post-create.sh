sudo chown -R node:node /home/node

curl -fsSL https://bun.sh/install | bash -s "bun-v1.1.29"
git config diff.lockb.textconv bun
git config diff.lockb.binary true

# Install yarn for manypkg
bun install -g yarn

bun install
