FROM node:7.1

RUN mkdir -p /app
WORKDIR /app

COPY build/docker/entrypoint.sh /
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
