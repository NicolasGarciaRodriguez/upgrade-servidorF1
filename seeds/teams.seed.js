const mongoose = require("mongoose");
const Team = require("../models/team");
const { dbConnection } = require("../db/db");

const teams = [
    {
        "name": "Mercedes AMG",
        "powerUnit": "Mercedes",
        "worldTitles": 7,
    },
    {
        "name": "Red Bull Racing",
        "powerUnit": "Honda",
        "worldTitles": 4,
    },
    {
        "name": "Ferrari",
        "powerUnit": "Ferrari",
        "worldTitles": 16,
    },
    {
        "name": "Mclaren",
        "powerUnit": "Mercedes",
        "worldTitles": 8,
    },
    {
        "name": "Alpine",
        "powerUnit": "Renault",
        "worldTitles": 2,
    },
    {
        "name": "Alphatauri",
        "powerUnit": "Honda",
        "worldTitles": 0,
    },
    {
        "name": "Aston Martin",
        "powerUnit": "Mercedes",
        "worldTitles": 0,
    },
    {
        "name": "Williams Racing",
        "powerUnit": "Mercedes",
        "worldTitles": 9,
    },
    {
        "name": "Alfa Romeo",
        "powerUnit": "Ferrari",
        "worldTitles": 0,
    },
    {
        "name": "Hass",
        "powerUnit": "Ferrari",
        "worldTitles": 0,
    },
];

const teamsDocuments =  teams.map(team => new Team(team));

dbConnection
    .then(async () => {
        const allTeams = await Team.find();
        if (allTeams.length > 0) {
            await Team.collection.drop();
        }
    })
    .catch((error) => console.error(`Error eliminando la coleccion de teams ${error}`))
    .then(async () => {
        await Team.insertMany(teamsDocuments)
    })
    .catch((error) => console.error(`Error al insertar en Teams ${error}`))
    .finally(() => mongoose.disconnect());