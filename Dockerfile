FROM node:14.17-alpine

# Create app directory
WORKDIR /app
COPY . .

RUN yarn
RUN yarn build
RUN rm -rf yarn.lock components pages plugins layouts assets

ENV HOST 0.0.0.0
EXPOSE 3000

# start command
CMD [ "yarn", "start" ]
