const router = require("express").Router()
const cluster = require("../model/blogModel")

router.get("/",async(req,res)=>{res.render("home/index",{blogs:await cluster.blogModel.find()})})

module.exports.HomeController = router