import express from 'express'
import bycrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { db } from "./../../models/admin.js"

const router = express.Router()

router.get('/', (req, res) => {
    res.render('auth/login')
})

router.post('/', async (req, res) => {

    try {
        const { username, password } = req.body

        db.get("SELECT * FROM adminUser WHERE name = ?", [username], async (err, user) => {
            if(err) {
                return res.status(500).send({ error: "Internal Server Error" })
            }

            if(!user) {
                console.log("User not found")
                return res.render("auth/login", { error: "User not found" })
            }

            const isPasswordCorrect = await bycrypt.compare(password, user.password)

            if(!isPasswordCorrect) {
                console.log("Invalid password")
                return res.render("auth/login", { error: "Invalid password" })
            }
            
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" })

            req.session.token = token

            res.redirect("/dashboard")
        })
        
    }

    catch(err) {
        console.log(err)
        return res.status(500).send({ error: "Internal Server Error" })
    }

})

export default router