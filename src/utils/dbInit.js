import sqlite3 from 'sqlite3'
import bcrypt from 'bcrypt'

const db = new sqlite3.Database('./src/db/db.db')

function initDBUser (db) {
    db.get("SELECT * FROM adminUSER WHERE id=1", (err, user) => {
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
}

export {
    initDBUser
}