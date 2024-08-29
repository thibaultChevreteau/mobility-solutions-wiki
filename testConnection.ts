const { Pool } = require("pg")
const fs = require("fs")
require("dotenv").config() // Ensure environment variables are loaded

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

async function testConnection() {
  try {
    const result = await pool.query("SELECT NOW()")
    console.log("Connection successful:", result.rows[0])
    process.exit(0)
  } catch (err) {
    console.error("Connection failed:", err)
    process.exit(1)
  }
}

testConnection()
