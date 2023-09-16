FROM node:16.14.2
WORKDIR /app
COPY package*.json ./ 
RUN npm install
COPY . /app/
ENTRYPOINT [ "npm", "run" ]
CMD [ "start" ]