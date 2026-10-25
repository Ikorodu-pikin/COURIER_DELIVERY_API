
const db = require("../configs/db");

// Create a new delivery
const createDelivery = (req, res) => {
    const {
        sender_name,
        receiver_name,
        receiver_phone,
        pickup_address,
        delivery_address
    } = req.body;

    const sql = `
        INSERT INTO deliveries
        (sender_name, receiver_name, receiver_phone, pickup_address, delivery_address)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            sender_name,
            receiver_name,
            receiver_phone,
            pickup_address,
            delivery_address
        ],
        (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: "Failed to create delivery"
                });
            }

            return res.status(201).json({
                message: "Delivery created successfully",
                deliveryId: result.insertId
            });
        }
    );
};




const getAllDeliveries = (req, res) => {
    const status = req.query.status;

    let sql = "SELECT * FROM deliveries";
    let values = [];

    if (status) {
        sql += " WHERE status = ?";
        values.push(status);
    }

    db.query(sql, values, (err, results) => {
        if (err) {
            return res.status(500).json({
                message: "Failed to get deliveries"
            });
        }

        return res.status(200).json({
            message: "Deliveries retrieved successfully",
            deliveries: results
        });
    });
};




const getDeliveryById = (req, res) => {
    const deliveryId = req.params.id;

    const sql = "SELECT * FROM deliveries WHERE id = ?";

    db.query(sql, [deliveryId], (err, results) => {
        if (err) {
            return res.status(500).json({
                message: "Failed to get delivery"
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                message: "Delivery not found"
            });
        }

        return res.status(200).json({
            message: "Delivery retrieved successfully",
            delivery: results[0]
        });
    });
};



const updateDelivery = (req, res) => {
    const deliveryId = req.params.id;

    const {
        sender_name,
        receiver_name,
        receiver_phone,
        pickup_address,
        delivery_address,
        status
    } = req.body;

    const sql = `
        UPDATE deliveries
        SET sender_name = ?,
            receiver_name = ?,
            receiver_phone = ?,
            pickup_address = ?,
            delivery_address = ?,
            status = ?
        WHERE id = ?
    `;

    db.query(
        sql,
        [
            sender_name,
            receiver_name,
            receiver_phone,
            pickup_address,
            delivery_address,
            status,
            deliveryId
        ],
        (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: "Failed to update delivery"
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: "Delivery not found"
                });
            }

            return res.status(200).json({
                message: "Delivery updated successfully"
            });
        }
    );
};




const deleteDelivery = (req, res) => {
    const deliveryId = req.params.id;

    const sql = "DELETE FROM deliveries WHERE id = ?";

    db.query(sql, [deliveryId], (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Failed to delete delivery"
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Delivery not found"
            });
        }

        return res.status(200).json({
            message: "Delivery deleted successfully"
        });
    });
};


module.exports = {
    createDelivery,
    getAllDeliveries,
    getDeliveryById,
    updateDelivery,
    deleteDelivery
};
