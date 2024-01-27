import express from 'express'
import bycrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { db } from "./../../models/admin.js"
import { loginContoller, newLogin } from '../../controllers/logincontroller.js'

const router = express.Router()

router.get('/', (req, res) => {
    res.render('auth/login', { error: null })
})

router.post('/', async (req, res) => {

    loginContoller(req, res)

})

router.post('/newlogin', async (req, res) => {
    newLogin(req, res)
})

export default router