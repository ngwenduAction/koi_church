import { randomUUID } from "node:crypto";
import { mkdirSync } from "node:fs";
import { join } from "node:path";
import { DatabaseSync } from "node:sqlite";

const databaseDirectory = join(process.cwd(), "prisma");
const databasePath = join(databaseDirectory, "dev.db");

let database: DatabaseSync | null = null;

function initializeDatabase() {
  mkdirSync(databaseDirectory, { recursive: true });

  const instance = new DatabaseSync(databasePath);

  instance.exec(`
    CREATE TABLE IF NOT EXISTS MembershipRequest (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      location TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'pending',
      createdAt TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS PrayerRequest (
      id TEXT PRIMARY KEY,
      name TEXT,
      email TEXT,
      request TEXT NOT NULL,
      isConfidential INTEGER NOT NULL DEFAULT 1,
      createdAt TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS Teaching (
      id TEXT PRIMARY KEY,
      slug TEXT NOT NULL UNIQUE,
      title TEXT NOT NULL,
      content_en TEXT,
      content_zu TEXT,
      content_st TEXT,
      pdf_url_en TEXT,
      pdf_url_zu TEXT,
      pdf_url_st TEXT
    );
  `);

  return instance;
}

export function createId() {
  return randomUUID();
}

export function getDatabase() {
  if (!database) {
    database = initializeDatabase();
  }

  return database;
}
