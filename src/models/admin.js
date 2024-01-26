import sqlite3 from 'sqlite3'
import bcrypt from 'bcrypt'
import crypto from 'crypto'

const db = new sqlite3.Database('./src/db/db.db')

const initDB = () => {
    db.serialize(() => {
        db.run(`
            CREATE TABLE IF NOT EXISTS adminUser (
                name TEXT,
                password TEXT
            )
        `)

        db.get("SELECT * FROM adminUSER WHERE name = 'admin'", (err, user) => {
            if (err) {
                return console.log(err)
            }

                        if (!user) { 
                            const defaultPass = process.env.DEFAULTPASS
                            bcrypt.hash(defaultPass, 10, (err, hash) => {
                                if (err) {
                                    return console.log(err)
                                }

                                const insertStmt = db.prepare("INSERT INTO adminUser (name, password) VALUES (?, ?)")
                                insertStmt.run('admin', hash)
                                insertStmt.finalize()
                            })
                        }
                    })
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