const Router = require("express")
const router = new Router()
const dailyReportsRouter = require("../controller/daily-reports-controller")
const authMiddleware = require("../middlewares/AuthMiddleware")

router.post("/",authMiddleware,dailyReportsRouter.post)
router.get("/",authMiddleware,dailyReportsRouter.get)

module.exports = router
