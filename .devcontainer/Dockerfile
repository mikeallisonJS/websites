# Update the VARIANT arg in docker-compose.yml to pick a Node version
FROM mcr.microsoft.com/vscode/devcontainers/typescript-node:0-20-bullseye

# postgresql
RUN sh -c 'echo "deb [signed-by=/usr/share/keyrings/postgresql-archive.keyring.gpg] https://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
RUN wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | gpg --dearmor | tee /usr/share/keyrings/postgresql-archive.keyring.gpg

RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends postgresql-client apt-transport-https ca-certificates curl gnupg 

ENV BUN_INSTALL="/home/node/.bun"
ENV PATH=$BUN_INSTALL/bin:$PATH

RUN chown -R node:node /home/node/.bun
RUN chown -R node:node /home/node/.config
