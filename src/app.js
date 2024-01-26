import express from 'express'
import open from 'open'
import dotenv from 'dotenv'
import session from 'express-session'

import socketUtils from './utils/socketUtil.js'
import handleAuthError from './middleware/authError.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.set('views', './src/views')
app.use(session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    }
}))

app.use(handleAuthError)

app.get('/', (req, res) => {
    res.render('home')
})

app.get("/logout", (req, res) => {
    req.session.token = null;
    console.log("Logged out")
    res.redirect("/")
})

import loginRoute from './routes/auth/login.js'
app.use("/login", loginRoute)

import dashboardRoute from './routes/dashboard/dashboard.js'
app.use("/dashboard", dashboardRoute)

app.listen(port, () => {
    console.log(`Dashboard is running on port ${port}`)
})
