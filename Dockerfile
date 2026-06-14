FROM node:22-slim AS build

WORKDIR /app

ARG VITE_API_BASE=http://31.130.155.44
ENV VITE_API_BASE=$VITE_API_BASE

COPY package.json package-lock.json ./
RUN npm ci --include=optional && \
    npm install --no-save \
      @rollup/rollup-linux-x64-gnu@4.50.0 \
      lightningcss-linux-x64-gnu@1.30.1 \
      @tailwindcss/oxide-linux-x64-gnu@4.1.12

COPY . .
RUN npm run build

FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
