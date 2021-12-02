const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    else {
        return res.status(401).json(`Debes estar logeado`)
    }
}


module.exports = isAuthenticated
