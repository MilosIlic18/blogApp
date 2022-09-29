app = require("express")()
app.use(require("body-parser")())
app.set("view engine","ejs")
const blogController = require("./controller/blogController")
const homeController = require("./controller/homeController")

app.use("/",homeController.HomeController)
app.use("/blog",blogController.BlogController)

app.listen(1000)