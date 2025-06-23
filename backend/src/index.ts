import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

const app = express();
app.use(express.json());
dotenv.config();
const url = process.env.MONGODB_URI;
const port = process.env.PORT

app.post("/signup", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;


})

async function main(){
    await mongoose.connect(url);
    app.listen(port)
}
