FROM node:22-alpine AS base

RUN npm i --global --no-update-notifier --no-fund pnpm

FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --ignore-scripts

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . . 
RUN pnpm prisma:generate
RUN pnpm build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder --chown=node:node /app/next.config.ts ./
COPY --from=builder --chown=node:node /app/public ./public
COPY --from=builder --chown=node:node /app/.next ./.next
COPY --from=builder --chown=node:node /app/node_modules ./node_modules
COPY --from=builder --chown=node:node /app/package.json ./package.json
COPY --from=builder --chown=node:node /app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder --chown=node:node /app/prisma ./prisma

COPY --chown=node:node docker-entrypoint.sh ./docker-entrypoint.sh

RUN chmod +x ./docker-entrypoint.sh

USER node

EXPOSE 3000

ENTRYPOINT ["sh", "./docker-entrypoint.sh"]

CMD ["pnpm", "start"]