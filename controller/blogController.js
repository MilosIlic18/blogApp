const router = require("express").Router()
const cluster = require("../model/blogModel")
router.get("/",(req,res)=>res.json({"title":"Milos"}))
router.get("/create",(req,res)=>res.render("blog/create",{modelInp:new cluster.blogModel}))

router.get("/update/:id",async(req,res)=>res.render("blog/update",{modelInp:await cluster.blogModel.findById(req.params.id)}))
router.post("/createProcess",async(req,res)=>{
    const blogmodel = new cluster.blogModel( {
        "title": String(req.body.title).replace(',',''),
        "date": new Date(),
        "description":req.body.description,
        "location":  req.body.location
    })
    blogmodel.validate().then(()=>{
        blogmodel.save(),
        res.redirect("/")
        
        
    }).catch(err=>{
        title = err.errors.title!==undefined?err.errors.title.message:""
        description = err.errors.description!==undefined?err.errors.description.message:""
        location = err.errors.location!==undefined?err.errors.location.message:""
        res.render("blog/create",{titleError:title,descriptionError:description,locationError:location,modelInp:blogmodel})
    })
})

router.post("/updateProcess/:id",async(req,res)=>{
    const blogmodel= {
        "title":      String(req.body.title).replace(',',''),
        "datet": new Date(), 
        "description":req.body.description,
        "location":   req.body.location
    }
    new cluster.blogModel(blogmodel).validate().then(()=>{
        cluster.blogModel.updateOne({"_id":req.params.id},blogmodel).then(()=>res.redirect("/blog/"+req.params.id))
    }).catch(()=>{
        res.redirect("/blog/update/"+req.params.id)
    })
})

router.get("/deleteProcess/:id",async(req,res)=>{
    await cluster.blogModel.deleteOne({"_id":req.params.id})
    res.redirect("/")
})

router.get("/:id",async(req,res)=>{
    res.render("blog/detail",{blog:await cluster.blogModel.findById(req.params.id)})
})
module.exports.BlogController = router