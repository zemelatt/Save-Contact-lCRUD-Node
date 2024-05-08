FROM node:16.20.2
WORKDIR /usr/code
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3306
CMD ["npm", "start"]
