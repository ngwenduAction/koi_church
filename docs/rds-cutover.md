# Aurora RDS Cutover

KOI currently develops against local SQLite for safe offline work. For the Aurora cutover, use the PostgreSQL schema file below and a real Prisma connection URL.

## Required connection string

Use this exact shape:

`postgresql://<user>:<password>@<rds-endpoint>:5432/postgres?sslmode=require`

For the KOI cluster shown in your screenshots, the endpoint format should be:

`postgresql://postgres:<password>@koi-database-1.cluster-cd8esk2yaxvw.af-south-1.rds.amazonaws.com:5432/postgres?sslmode=require`

## Important note about the current .env attempt

Prisma cannot use a shell expression inside `.env` such as:

`password=$( aws rds generate-db-auth-token ... )`

The token or password must already be resolved into a plain string before Prisma runs.

## Push the schema to Aurora

1. Export or set `DATABASE_URL` to the resolved PostgreSQL URL above.
2. Run:

```powershell
npm run prisma:push:rds
```

This uses `prisma/schema.rds.prisma`, which mirrors the local schema but targets PostgreSQL.

## If using IAM database auth

Generate the auth token first, then place the resolved token into the password position of the URL before running Prisma. Because the token is temporary, do the schema push immediately after generating it.
