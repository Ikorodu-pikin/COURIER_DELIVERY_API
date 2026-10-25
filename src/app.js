
const express = require("express");
require("dotenv").config();

const db = require("./configs/db");

const deliveryRoutes = require("./routes/deliveryRoutes");

const app = express();



app.use(express.json());

app.use("/deliveries", deliveryRoutes);

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Courier Delivery API is running"
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Courier Delivery API is running on port ${PORT}`);
});
