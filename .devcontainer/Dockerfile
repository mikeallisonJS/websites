# Update the VARIANT arg in docker-compose.yml to pick a Node version
FROM mcr.microsoft.com/vscode/devcontainers/typescript-node:22-bookworm

# Update args in docker-compose.yaml to set the UID/GID of the "node" user.
ARG USER_UID=1000
ARG USER_GID=$USER_UID
RUN if [ "$USER_GID" != "1000" ] || [ "$USER_UID" != "1000" ]; then groupmod --gid $USER_GID node && usermod --uid $USER_UID --gid $USER_GID node; fi

ENV BUN_INSTALL="/home/node/.bun"
ENV PATH=$BUN_INSTALL/bin:$PATH

RUN apt-get update
RUN apt-get install -y apt-transport-https ca-certificates curl gnupg
