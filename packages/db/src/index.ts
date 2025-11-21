import { Pool, PoolClient } from "pg";

export interface DatabaseClient {
  query: PoolClient["query"];
  release: PoolClient["release"];
}

export interface Database {
  pool: Pool;
  getClient: () => Promise<DatabaseClient>;
}

let pool: Pool | null = null;

export const createDatabase = (connectionString?: string): Database => {
  if (!pool) {
    pool = new Pool({
      connectionString: connectionString ?? process.env.DATABASE_URL,
    });
  }

  return {
    pool,
    getClient: async () => {
      const client = await pool!.connect();
      return {
        query: client.query.bind(client),
        release: client.release.bind(client),
      };
    },
  };
};
