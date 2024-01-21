const Router = require("express")
const router = new Router()
const WordEncounteredController = require("../controller/Word-encountered-controller")
const authMiddleware = require("../middlewares/AuthMiddleware")

router.post("/",authMiddleware,WordEncounteredController.post)
router.get("/",authMiddleware,WordEncounteredController.get)

module.exports = router
