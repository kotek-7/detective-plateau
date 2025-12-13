FROM node:22-alpine
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack install --global pnpm@10
WORKDIR /app

# 依存インストール（dev も含む。tsx watch 用）
COPY pnpm-workspace.yaml pnpm-lock.yaml package.json ./
COPY packages/backend/package.json packages/backend/
RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store pnpm install --frozen-lockfile --filter backend... --prod=false

# ソースをコピー
COPY . .

WORKDIR /app/packages/backend
EXPOSE 3001
CMD ["pnpm", "run", "dev"]
