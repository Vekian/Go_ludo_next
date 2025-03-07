# Utilise l'image officielle de Node.js en version 18
FROM node:18.19.1 AS build

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier package.json et yarn.lock
COPY package.json yarn.lock ./

# Installer les dépendances avec Yarn
RUN yarn install

# Copier tout le reste des fichiers du projet
COPY . .

# Construire le projet Next.js
RUN yarn build

# Étape de production : utiliser une image plus légère
FROM node:18.19.1-slim

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier uniquement les fichiers nécessaires (build et node_modules)
COPY --from=build /app/.next ./.next
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/package.json /app/yarn.lock ./

# Exposer le port sur lequel Next.js écoute
EXPOSE 3000

# Démarrer l'application Next.js en mode production
CMD ["yarn", "start"]
