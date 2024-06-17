const mongoose = require("mongoose");
require("dotenv").config();

const connectionDb = () => {
    try {
        const uri = process.env.CONNENCTION_URL;
        mongoose.connect(uri);
        const connection = mongoose.connection;
        connection.once("open", () => {
            console.log("MongoDB database connection established successfully");
        });
    } catch (error) {
        console.log("MongoDB database connection unsuccessfully");
    }
};

module.exports = connectionDb;
