import { Pool } from "pg"

// Retrieve and decode the CA certificate from environment variables
const caCertBase64 = process.env.RDS_CA_CERT_BASE64
if (!caCertBase64) {
  throw new Error("RDS_CA_CERT_BASE64 environment variable is not set.")
}

let caCert
try {
  caCert = Buffer.from(caCertBase64, "base64").toString("utf-8")
} catch (error) {
  throw new Error("Failed to decode RDS_CA_CERT_BASE64.")
}

// Create a new pool instance with database configuration
const pool = new Pool({
  host: process.env.RDS_HOST,
  port: Number(process.env.RDS_PORT),
  database: process.env.RDS_DATABASE,
  user: process.env.RDS_USER,
  password: process.env.RDS_PASSWORD,
  ssl: {
    ca: caCert,
    rejectUnauthorized: true,
  },
})

const tableName =
  process.env.NODE_ENV === "production" ? "solutions" : "solutionsdev"

// Export the pool and tableName
export { pool, tableName }
