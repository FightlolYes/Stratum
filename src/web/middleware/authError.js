const handleAuthError = (err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        console.log("Unauthorized")
      res.redirect('/login');
    }
}

export default handleAuthError