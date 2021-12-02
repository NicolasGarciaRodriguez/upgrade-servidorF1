const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt")

const User = require("../models/users")

const saltos = 10


passport.use(
    "register",
    new LocalStrategy({
        emailField: "email",
        passwordField: "password",
        passReqToCallback: true,
    },
    async (req, email, password, done) => {
        try {
            const userExist = await User.findOne({ email: email });
            if(userExist) {
                const error = new Error(`Usuario ya registrado`)
                return done(error);
            }
            const passwordEncrypt = await bcrypt.hash(password, saltos);

            const newUser = new User({ email: email , password: passwordEncrypt });
            const saveUser = await newUser.save();

            done(null, saveUser)
        }
        catch(error) {
            done(Error)
        }
    })
);


passport.use(
    "login",
    new LocalStrategy({
        emailField: "email",
        passwordField: "password",
        passReqToCallback: true,
    }, 
    async (req, email, password, done) => {
        try{
            const user = await User.findOne({ email });
            if (!user) {
                const error = new Error(`El usuario ya está registrado`)
                return done(error)
            }
            const passwordValidation = await bcrypt.compare(password, user.password);
            if (!passwordValidation) {
                const error = new Error(`Contraseña incorrecta`)
                return done(error);
            }
            return done(null, user);
        }
        catch(error) {
            done(error)
        }
    })
);


passport.serializeUser((user, done) => {
    return done(null, user._id);
});

passport.deserializeUser((userId, done) => {
    User.findById(userId)
        .then((userExist) => {
            done(null, userExist);
        })
        .catch((error) => {
            done(error)
        });
});

