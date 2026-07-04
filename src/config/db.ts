import { Pool } from "pg";
import { config } from "./index.js";

export const pool = new Pool({
  connectionString: config.connection_str,
});

export const initDB = async () => {
  await pool.query(`
        CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(200) NOT NULL,
        email VARCHAR(300) UNIQUE NOT NULL ,
        password TEXT NOT NULL ,
        role VARCHAR(20) NOT NULL DEFAULT 'contributor',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
        `);

  await pool.query(`
        CREATE TABLE issues (
        id SERIAL PRIMARY KEY,
        title VARCHAR(150) NOT NULL,
        description TEXT NOT NULL,
        type VARCHAR(20) NOT NULL,
        status VARCHAR(20) NOT NULL DEFAULT 'open',
        reporter_id INTEGER NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
        `);
};
