const Router = require("express")
const router = new Router()
const generallDataController = require("../controller/Generall-data-controller")
const authMiddleware = require("../middlewares/AuthMiddleware")
router.post("/",authMiddleware,generallDataController.post)
router.get("/",authMiddleware,generallDataController.get)

module.exports = router
