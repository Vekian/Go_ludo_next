# Étape de build
FROM node:20-alpine AS builder

WORKDIR /app

# Copier les fichiers nécessaires
COPY package.json yarn.lock ./

# Installer les dépendances
RUN yarn install --frozen-lockfile

# Copier le reste du projet
COPY . .

# Build Next.js en production
RUN yarn build

# Étape finale: image de runtime
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copier les fichiers nécessaires au runtime
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/yarn.lock ./yarn.lock

# Installer uniquement les dépendances de production
RUN yarn install --frozen-lockfile --production

# Exposer le port
EXPOSE 3200

# Commande de démarrage
CMD ["yarn", "start"]
