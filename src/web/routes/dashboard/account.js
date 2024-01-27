import express from 'express'
import authenticateToken from '../../middleware/auth.js'

const router = express.Router()

router.get('/', async (req, res) => {
    res.render('dashboard/account')
})

export default router