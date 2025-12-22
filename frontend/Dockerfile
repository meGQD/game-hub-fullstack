FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

ARG VITE_BASE_URL=http://api.gamehub.cum
ENV VITE_BASE_URL=$VITE_BASE_URL

RUN npm run build

# Serve the App with Nginx
FROM nginx:1.21-alpine

COPY --from=builder /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
