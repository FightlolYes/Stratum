import express from 'express'
import open from 'open'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const port = process.env.PORT || 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.set('views', './src/views')

app.get('/', (req, res) => {
    res.render('home')
})

app.listen(port, () => {
    console.log(`Dashboard is running on port ${port}`)
    open('http://localhost:' + port)
})
