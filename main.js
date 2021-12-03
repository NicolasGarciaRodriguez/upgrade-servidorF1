const express = require("express");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
 
const { DB_URL } = require("./db/db");
require("./authentication/passport");
const { isAuthenticated } = require("./middlewares/auth.middlewares");



const teamsRouter = require("./routes/teams.router");
const driversRouter = require("./routes/drivers.route");
const usersRouter = require("./routes/users.router");
const server = express();
const PORT = 3000;

// --------------------------------------------------

server.use(express.json());
server.use(express.urlencoded({ extended: false }));

// --------------------------------------------------

server.use(session({
    secret: 'secreto-local',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 3600000
    },
    store: MongoStore.create({ mongoUrl: DB_URL })
}));

// --------------------------------------------------

server.use(passport.initialize());
server.use(passport.session());

// --------------------------------------------------

server.use("/teams", teamsRouter);
server.use("/drivers",  driversRouter);
server.use("/users", usersRouter);

server.use("*", (req, res, next) => {
    const error = new Error(`Ruta no encontrada`)
    error.status(404);
    next(error);
})

server.use((err, req, res, next) => {
    console.error(`[ERROR] Ha ocurrido un error ${err.status}, ${err.message}`);
    return res.status(err.status || 500).json(err.message || `Ha ocurrido un error en el servidor`)
})

server.listen(PORT, (req, res) => {
    console.log(`Servidor iniciado en el puerto ${PORT}`)
})