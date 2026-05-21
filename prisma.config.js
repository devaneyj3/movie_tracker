import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // Prisma CLI must use a direct connection (port 5432), not the pooler (6543).
    url: env("DIRECT_URL"),
  },
});