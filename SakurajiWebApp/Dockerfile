# Etapa 1: Construcción (Node solo vive aquí)
FROM node:20-alpine AS build
WORKDIR /app

# Aprovechamos el cache de Docker para las librerías
COPY package*.json ./
RUN npm install

COPY . .

# IMPORTANTE: Si usas Vite, la carpeta suele ser /dist. Si es Create React App, es /build.
# No necesitamos ARG si ponemos "/api" directamente en el .env o código.
RUN npm run build

# Etapa 2: Servidor de producción (Imagen final ligera)
FROM nginx:alpine

# Copiamos el resultado del build
# Cambia /app/dist por /app/build si no usas Vite
COPY --from=build /app/dist /usr/share/nginx/html

# Opcional: Copiar tu configuración de Nginx si tienes reglas personalizadas
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]