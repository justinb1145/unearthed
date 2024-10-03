import { pool } from './database.js'
import './dotenv.js'
import bridgeData from '../data/bridges.js'

const createBridgesTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS bridges;

        CREATE TABLE IF NOT EXISTS bridges (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            cost VARCHAR(10) NOT NULL,
            city VARCHAR(255) NOT NULL,
            image VARCHAR(255) NOT NULL,
            description TEXT NOT NULL,
            submittedBy VARCHAR(255) NOT NULL,
            completedOn TIMESTAMP NOT NULL
        )
    `

    try {
        const res = await pool.query(createTableQuery)
        console.log('🎉 bridges table created successfully', res)
    } catch (err) {
        console.error('⚠️ error creating bridges table', err)
    }
}

const seedBridgesTable = async () => {
    await createBridgesTable()

    bridgeData.forEach((bridge) => {
        const insertQuery = {
            text: 'INSERT INTO bridges (name, cost, city, image, description, completedOn, submittedBy) VALUES ($1, $2, $3, $4, $5, $6, $7)'
        }

        const values = [
            bridge.name,
            bridge.cost,
            bridge.city,
            bridge.image,
            bridge.description,
            bridge.completedOn,
            bridge.submittedBy
        ]

        pool.query(insertQuery, values, (err, res) => {
            if (err) {
                console.error('⚠️ error inserting bridge', err)
                return
            }

            console.log(`✅ ${bridge.name} added successfully`)
        })
    })
}

seedBridgesTable()   