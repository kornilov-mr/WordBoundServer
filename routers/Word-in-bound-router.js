const Router = require("express")
const router = new Router()
const wordInBoundController = require("../controller/Word-in-bound-controller")
const authMiddleware = require("../middlewares/AuthMiddleware")

router.post("/",authMiddleware,wordInBoundController.post)
router.get("/",authMiddleware,wordInBoundController.get)

module.exports = router
