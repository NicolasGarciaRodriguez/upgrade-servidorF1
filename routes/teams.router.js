const express = require("express")
const Team = require("../models/team")
const route = express.Router()

//Todas los equipos
route.get("/", (req, res, next) => {
    Team.find().populate("drivers")
        .then((teams) => {
            return res.json(teams)
        })
        .catch((error) => {
            next(error)
        })
});


//Un solo equipo
route.get("/:id", (req, res, next) => {
    const teamId = req.params.id
    Team.findById(teamId).populate("drivers")
        .then(team => {
            if (!team) {
                const error = new Error(`Equipo con id: ${teamId} no encontrado`)
                error.status(404)
                return next(error);
            }
            return res.json(team)
        })
        .catch(error => {
            next(error)
        })
});

//Pilotos de un determinado equipo
route.get("/:id/drivers", (req, res, next) => {
    const teamId = req.params.id;
    Team.findById(teamId).populate("drivers")
        .then(team => {
            if (!team) {
                const error = new Error
                error.status = 404
                next(error)
            }
            return res.json(team.drivers)
        })
        .catch(error => {
            next(error)
        })
});


//Crear un equipo
route.post("/", (req, res, next) => {
    const newTeam = new Team(req.body)
    newTeam.save()
        .then(() => {
            return res.status(200).json(`Equipo creado correctamente`)
        })
        .catch(error => {
            next(error)
        })
})


//Eliminar un equipo
route.delete("/:id", (req, res, next) => {
    const teamId = req.params.id
    Team.findByIdAndDelete(teamId)
        .then(() => {
            return res.status(200).json(`Equipo eliminado correctamente`)
        })
        .catch(error => {
            next(error)
        })
});



//Añadir piloto a equipo
route.put("/:id/drivers", (req, res, next) => {
    const teamId = req.params.id
    const driverId = req.body.driverToAdd

    Team.findByIdAndUpdate(
        teamId,
        { $push: { drivers: driverId } },
        { new: true }
    )
        .then(teamUpdated => {
            res.status(200).json(teamUpdated)
        })
        .catch(error => {
            next(error);
        });
});


module.exports = route