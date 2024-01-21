const Router = require("express")
const router = new Router()
const bookFilesRouter = require("../controller/Book-files-controller")
const authMiddleware = require("../middlewares/AuthMiddleware")

router.post("/",authMiddleware,bookFilesRouter.post)
router.get("/",authMiddleware,bookFilesRouter.get)

module.exports = router
