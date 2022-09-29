const cluster = require("../config/config")
const blogSchema = cluster.cluster.Schema({
    title:{type:String,required:[true,"Unesite naziv"],match:[/^[A-Z][a-z]+ [0-9]+$/,"Naziv mora biti odgovarajuceg formata"]},
    date:{type:Date},
    description:{type:String,required:[true,"Unesite opis"]},
    location:{type:String,required:[true,"Unesite lokaciju"]}
})

module.exports.blogModel = cluster.cluster.model("blog",blogSchema)