const Router = require("express")
const router = new Router()
const userController = require("../controller/User-controller")
const authMiddleware = require("../middlewares/AuthMiddleware")

router.post("/registration",userController.registration)
router.post("/login",userController.login)
router.get("/check",authMiddleware,userController.check)


module.exports = router
