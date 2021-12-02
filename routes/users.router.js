const express = require("express")
const passport = require("passport")
// const { isAuthenticated } = require("./middlewares/auth.middlewares")

const route = express.Router()


//Registro
route.post("/register", (req, res, next) => {
    passport.authenticate("register", (error, user) => {
        if (error) {
            return next(error)
        }
        req.logIn(user, (error) => {
            if (error) {
                return next(error)
            }
            return res.status(201).json(user)
        });
    })(req);
})




//LogIn
route.post("/login", (req, res, next) => {
    passport.authenticate("login", (error, user) => {
        if (error) {
            return next(error)
        }
        req.logIn(user, (error) => {
            if (error) {
                return next(error)
            }
            return res.status(200).json(user)
        })
    })(req)
})




//LogOut
route.post("/logout", (req, res, next) => {
    if (req.user) {
        req.logout();
        req.session.destroy(() => {
            res.clearCookie("connect.sid");
            return res.status(200).json(`Sesion cerrada`)
        })
    }
    else {
        res.sendStatus(304);
    }
})



module.exports = route