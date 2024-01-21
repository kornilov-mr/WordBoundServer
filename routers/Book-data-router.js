const Router = require("express")
const router = new Router()
const bookDataController = require("../controller/Book-data-controller")
const authMiddleware = require("../middlewares/AuthMiddleware")

router.post("/",authMiddleware,bookDataController.post)
router.get("/",authMiddleware,bookDataController.get)

module.exports = router
