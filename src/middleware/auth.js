import jwt from "jsonwebtoken"

const authenticateToken = (req, res, next) => {
    const token = req.session.token

    if(!token) {
        console.log("No token found")
        return res.redirect("/login")
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        if(err) {
            console.log("Invalid token")
            return res.redirect("/login")
        }

        req.userID = decodedToken.id
        console.log("Token verified")
        next()
    })
}

export default authenticateToken