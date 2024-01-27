import sqlite3 from 'sqlite3'
import bcrypt from 'bcrypt'

import { initDBUser } from '../utils/dbInit.js'

const db = new sqlite3.Database('./src/web/db/admin.db')

const initDB = () => {
    db.serialize(() => {
        db.run(`
            CREATE TABLE IF NOT EXISTS adminUser (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                password TEXT
            )
        `)

        initDBUser(db)
    })
}

initDB()

const adminUserSchema = {
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    }
}

export {
    db,
    adminUserSchema
}