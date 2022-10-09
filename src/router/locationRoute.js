const {createRestaurant,restaurant} = require("../controller/locationController")

const express = require("express")

const router = express.Router()

router.route("/")
.post(createRestaurant)

router.get("/:zipcode/:distance/:unit",restaurant)

module.exports = router

