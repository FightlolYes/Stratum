import express from 'express'
import authenticateToken from '../../middleware/auth.js'
import accountRouter from './account.js'

const router = express.Router()

router.get('/', async (req, res) => {
    res.render('dashboard/dashboard')
})

router.use('/account', accountRouter)

export default router