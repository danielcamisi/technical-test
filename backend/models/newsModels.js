const mongoose = require("mongoose");

const newsModel = new mongoose.Schema({
    img: {type:String, required:true},
    title: {type:String, required:true},
    desc: {type:String, required:true},
    details:{type:String, require:true},
    authorEmail: {type:String, require:true},
    createAt: {type:Date, default: Date.now}
})


module.exports = mongoose.model("news", newsModel);