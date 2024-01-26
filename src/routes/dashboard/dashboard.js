import express from 'express'
import authenticateToken from '../../middleware/auth.js'

const router = express.Router()

router.get('/', authenticateToken, async (req, res) => {
    res.render('dashboard/dashboard')
})

export default router