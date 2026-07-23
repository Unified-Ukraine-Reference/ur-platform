import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { join } from 'node:path';
import { config } from 'dotenv';

void config({ path: join(process.cwd(), '.env.local') });

const DATABASE_URL = process.env['DATABASE_URL'];
if (!DATABASE_URL) {
  throw new Error('DATABASE_URL is not set');
}

export const pool = new Pool({ connectionString: DATABASE_URL });
export const db = drizzle(pool);

export type DbClient = typeof db | Parameters<Parameters<typeof db.transaction>[0]>[0];
