require("dotenv").config();
const express = require("express");
const mongoose = require('mongoose');
const routes = require('./routes/routes')
const app = express();
const cors = require("cors")
const PORT = process.env.PORT
require("./config/config");
const path = require("path");

app.use(express.json());
app.use(cors({
    origin: "*",
    methods:["GET", "POST", "PUT", "DELETE"],
    credentials:true
}));
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use('/', routes);

app.get('/', (req,res)=>{
    res.status(200).send("Technical Test API")
})

app.listen(PORT, ()=> {
    console.log(`Servidor rodando na porta ${PORT}`)
})