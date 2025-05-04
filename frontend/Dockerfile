FROM node:18-slim AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .  # Copy everything from the current directory (i.e., frontend)
RUN npm run build
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]