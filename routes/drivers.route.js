const express = require("express")
const Driver = require("../models/driver")
const route = express.Router()


//get Todos los pilotos
route.get("/", (req, res, next) => {
    Driver.find()
        .then((drivers) => {
            return res.json(drivers)
        })
        .catch((error) => {
            return next(error)
        })
});


//get piloto por id
route.get("/:id", (req, res, next) => {
    const driverId = req.params.id;
    Driver.findById(driverId)
        .then((driver) => {
            if(!driver) {
                const error = new Error(`Piloto con id: ${driverId} no encontrado`)
                error.status = 404
                return next(error);
            }
            return res.json(driver)
        })
        .catch((error) => {
            return next(error)
        })
});

//post crear piloto
route.post("/", (req, res, next) => {
    const newDriver = new Driver(req.body);
    newDriver.save()
        .then(() => {
            return res.status(200).json(`Piloto creado correctamente`)
        })
        .catch(error => {
            next(error)
        })
})

//eliminar un piloto
route.delete("/:id", (req, res, status) => {
    const driverId = req.params.id
    Driver.findByIdAndDelete(driverId)
        .then(() => {
            res.status(200).json(`Piloto eliminado correctamente`)
        })
        .catch(error => {
            next(error)
        })
});


//editar un piloto
route.put("/:id", (req, res, next) => {
    const driverId = req.params.id
    const newDriver = new Driver(req.body)
    newDriver._id = driverId
    Driver.findByIdAndUpdate(driverId, newDriver, { new: true })
        .then((driverUpdated) => {
            return res.status(200).json(`Piloto actualizado ${driverUpdated}`)
        })
        .catch(error => {
            next(error)
        })


})


module.exports = route