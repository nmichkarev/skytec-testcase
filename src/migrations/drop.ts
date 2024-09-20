import "dotenv/config";
import pg from "pg";

const { Pool } = pg;
const pool = new Pool();

const client = await pool.connect();

await client.query("DROP TABLE IF EXISTS balance_changes;");
await client.query("DROP TABLE IF EXISTS users;");
await client.query("DROP TYPE IF EXISTS action_name;");

await pool.end();
