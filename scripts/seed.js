const { db } = require("@vercel/postgres")
const { solutions } = require("../app/lib/wiki-solutions_placeholder_data.js")

async function seedSolutions(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`

    // Create the "solutions" table if it doesn't exist
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS solutions (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      category VARCHAR(50) NOT NULL,
      imgUrl VARCHAR(255) NOT NULL,
      imgId VARCHAR(255) NOT NULL,
      latitude DOUBLE PRECISION NOT NULL,
      longitude DOUBLE PRECISION NOT NULL,
      website VARCHAR(255),
      contact TEXT,
      details TEXT
    );
  `

    console.log(`Created "solutions" table`)

    // Insert data into the "solutions" table
    const insertedSolutions = await Promise.all(
      solutions.map(
        solution => client.sql`
        INSERT INTO solutions (name, description, category, imgUrl, imgId, latitude, longitude, website, contact, details)
        VALUES (${solution.name}, ${solution.description}, ${solution.category}, ${solution.img}, ${solution.imgId}, ${solution.latitude}, ${solution.longitude}, ${solution.website}, ${solution.contact}, ${solution.details})
        ON CONFLICT (id) DO NOTHING;
      `
      )
    )

    console.log(`Seeded ${insertedSolutions.length} solutions`)

    return {
      createTable,
      solutions: insertedSolutions,
    }
  } catch (error) {
    console.error("Error seeding solutions:", error)
    throw error
  }
}

async function main() {
  const client = await db.connect()

  await seedSolutions(client)

  await client.end()
}

main().catch(err => {
  console.error("An error occurred while attempting to seed the database:", err)
})
