"use server"
import mongoose from "mongoose";

const connection = {};

export const connectToDb = async () => {
    try {
        if (connection.isConnected) {
            console.log("Using existing connection");
            return;
        } else {
            const db = await mongoose.connect(process.env.MONGO);
            connection.isConnected = db.connections[0].readyState;
            console.log("Connected to MongoDB");
        }
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw new Error("Failed to connect to MongoDB");
    }
};
