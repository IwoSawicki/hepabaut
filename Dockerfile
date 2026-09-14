# Multi-Stage-Build: Astro statisch bauen → mit nginx ausliefern.
# Ergebnis ist ein reiner Static-Server (kein Node zur Laufzeit).

# ---- Build-Stage ----
FROM node:22-alpine AS build
WORKDIR /app

# Nur Manifeste zuerst → Docker-Layer-Cache für npm ci
COPY package.json package-lock.json ./
# --omit=dev: devDependencies (Playwright!) werden nicht installiert —
# verhindert den Browser-Download im Container und hält das Image klein.
RUN npm ci --omit=dev

COPY . .
RUN npm run build

# ---- Runtime-Stage ----
FROM nginx:alpine
# Default = indexierbar (Prod/main). Staging (dev) überschreibt ROBOTS_TAG in Dokploy
# mit "noindex, nofollow". Das nginx-Image ersetzt ${ROBOTS_TAG} in der .template-Datei
# beim Container-Start per envsubst (nur definierte Env-Vars → $uri etc. bleiben unangetastet).
ENV ROBOTS_TAG="all"
COPY nginx.conf /etc/nginx/templates/default.conf.template
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s CMD wget -q -O /dev/null http://127.0.0.1/ || exit 1
