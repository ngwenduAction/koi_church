# Aurora RDS Cutover

KOI now supports environment-native Prisma commands. Local SQLite and production Aurora/PostgreSQL use the same application code, and the Prisma command wrapper selects the correct schema by `DATABASE_URL` or `PRISMA_TARGET`.

## Required connection string

Use this exact shape:

`postgresql://<user>:<password>@<rds-endpoint>:5432/postgres?sslmode=require`

For the KOI cluster shown in your screenshots, the endpoint format should be:

`postgresql://postgres:<password>@koi-database-1.cluster-cd8esk2yaxvw.af-south-1.rds.amazonaws.com:5432/postgres?sslmode=require`

## Important note about shell expressions in .env

Prisma cannot use a shell expression inside `.env` such as:

`password=$( aws rds generate-db-auth-token ... )`

The token or password must already be resolved into a plain string before Prisma runs.

## Deployment checklist

1. Set `DATABASE_URL` in the deployment platform to the real Aurora PostgreSQL URL.
2. Set `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY`.
3. Set `PAYSTACK_SECRET_KEY`.
4. Set `ADMIN_USERNAME` and `ADMIN_PASSWORD`.
5. Run `npm run prisma:push:rds` once against the production environment.
6. Deploy normally; `npm run build` will call `npm run prisma:generate`, and the schema wrapper will infer the correct target from `DATABASE_URL`.

## Available commands

```powershell
npm run prisma:generate
npm run prisma:push
npm run prisma:push:rds
```

- `prisma:generate` chooses `prisma/schema.prisma` for local SQLite and `prisma-rds/schema.prisma` for PostgreSQL.
- `prisma:push` does the same automatic environment detection.
- `prisma:push:rds` forces the Aurora/PostgreSQL schema explicitly.

## If using IAM database auth

Generate the auth token first, then place the resolved token into the password position of the URL before running Prisma. Because the token is temporary, do the schema push immediately after generating it.

