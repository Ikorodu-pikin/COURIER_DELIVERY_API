
const express = require("express");
const router = express.Router();

const { body, param, query } = require("express-validator");
const validate = require("../middleware/validate");

const {
    createDelivery,
    getAllDeliveries,
    getDeliveryById,
    updateDelivery,
    deleteDelivery
} = require("../controllers/deliveryController");

// Create a new delivery
router.post(
    "/",
    [
        body("sender_name")
            .trim()
            .notEmpty()
            .withMessage("Sender name is required"),

        body("receiver_name")
            .trim()
            .notEmpty()
            .withMessage("Receiver name is required"),

        body("receiver_phone")
            .trim()
            .matches(/^\d{11}$/)
            .withMessage("Receiver phone must contain exactly 11 digits"),

        body("pickup_address")
            .trim()
            .notEmpty()
            .withMessage("Pickup address is required"),

        body("delivery_address")
            .trim()
            .notEmpty()
            .withMessage("Delivery address is required"),

        validate
    ],
    createDelivery
);

// Get all deliveries

router.get(
    "/",
    [
        query("status")
            .optional()
            .isIn(["pending", "pick up", "in_transit", "delivered"])
            .withMessage("Status must be pending, pick up, in_transit, or delivered"),

        validate
    ],
    getAllDeliveries
);


// Get one delivery by ID
router.get(
    "/:id",
    [
        param("id")
            .isInt({ min: 1 })
            .withMessage("Delivery ID must be a positive number"),

        validate
    ],
    getDeliveryById
);

// Update a delivery by ID
router.put(
    "/:id",
    [
        param("id")
            .isInt({ min: 1 })
            .withMessage("Delivery ID must be a positive number"),

        body("sender_name")
            .trim()
            .notEmpty()
            .withMessage("Sender name is required"),

        body("receiver_name")
            .trim()
            .notEmpty()
            .withMessage("Receiver name is required"),

        body("receiver_phone")
            .trim()
            .matches(/^\d{11}$/)
            .withMessage("Receiver phone must contain exactly 11 digits"),

        body("pickup_address")
            .trim()
            .notEmpty()
            .withMessage("Pickup address is required"),

        body("delivery_address")
            .trim()
            .notEmpty()
            .withMessage("Delivery address is required"),



        body("status")
            .trim()
            .isIn(["pending", "pick up", "in_transit", "delivered"])
            .withMessage("Status must be pending, pick up, in_transit, or delivered"),

        validate
    ],
    updateDelivery
);



// Delete a delivery by ID
router.delete(
    "/:id",
    [
        param("id")
            .isInt({ min: 1 })
            .withMessage("Delivery ID must be a positive number"),

        validate
    ],
    deleteDelivery
);

module.exports = router;
