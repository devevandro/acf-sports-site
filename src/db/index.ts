import { neon } from "@neondatabase/serverless";

let sql: ReturnType<typeof neon> | null = null;

export function getDb() {
  if (!sql) {
    sql = neon(process.env.DATABASE_URL!);
  }
  return sql;
}
