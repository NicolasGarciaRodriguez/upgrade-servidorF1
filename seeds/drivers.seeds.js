const mongoose = require("mongoose");
const Driver = require("../models/driver");
const { dbConnection } = require("../db/db");

const drivers = [
    {
        "name": "Lewis Hamilton",
        "wins": 102,
        "podiums": 180,
        "worldTitles": 6
    },
    {
        "name": "Max Verstappen",
        "wins": 19,
        "podiums": 58,
        "worldTitles": 0
    },
    {
        "name": "Valttery Bottas",
        "wins": 10,
        "podiums": 66,
        "worldTitles": 0
    },
    {
        "name": "Fernando Alonso",
        "wins": 32,
        "podiums": 3,
        "worldTitles": 0
    },
    {
        "name": "Pierre Gasly",
        "wins": 1,
        "podiums": 180,
        "worldTitles": 6
    },
    {
        "name": "Antonio Giovinazzi",
        "wins": 0,
        "podiums": 0,
        "worldTitles": 0
    },
    {
        "name": "Nicholas Latifi",
        "wins": 0,
        "podiums": 0,
        "worldTitles": 0
    },
    {
        "name": "Charles Leclerc",
        "wins": 2,
        "podiums": 13,
        "worldTitles": 0
    },
    {
        "name": "Nikita Mazepin",
        "wins": 0,
        "podiums": 0,
        "worldTitles": 0
    },
    {
        "name": "Lando Norris",
        "wins": 0,
        "podiums": 5,
        "worldTitles": 0
    },
    {
        "name": "Esteban Ocon",
        "wins": 1,
        "podiums": 2,
        "worldTitles": 0
    },
    {
        "name": "Sergio Perez",
        "wins": 2,
        "podiums": 15,
        "worldTitles": 0
    },
    {
        "name": "Kimi Raikkonen",
        "wins": 21,
        "podiums": 103,
        "worldTitles": 1
    },
    {
        "name": "Daniel Ricciardo",
        "wins": 8,
        "podiums": 32,
        "worldTitles": 0
    },
    {
        "name": "George Russell",
        "wins": 0,
        "podiums": 1,
        "worldTitles": 0
    },
    {
        "name": "Carlos Sainz",
        "wins": 0,
        "podiums": 5,
        "worldTitles": 0
    },
    {
        "name": "Mick Shumacher",
        "wins": 0,
        "podiums": 0,
        "worldTitles": 0
    },
    {
        "name": "Lance Stroll",
        "wins": 0,
        "podiums": 3,
        "worldTitles": 0
    },
    {
        "name": "Yuki Tsunoda",
        "wins": 0,
        "podiums": 0,
        "worldTitles": 0
    },
    {
        "name": "Sebastian Vettle",
        "wins": 53,
        "podiums": 122,
        "worldTitles": 4
    },
]

const driversDocuments = drivers.map(driver => new Driver(driver));

dbConnection
    .then(async () => {
        const allDrivers = await Driver.find();
        if (allDrivers.length > 0) {
            await Driver.collection.drop();
        }
    })
    .catch((error) => console.error(`Error eliminando la coleccion de drivers ${error}`))
    .then(async () => {
        await Driver.insertMany(driversDocuments)
    })
    .catch((error) => console.error(`Error al insertar en Drivers ${error}`))
    .finally(() => mongoose.disconnect());
