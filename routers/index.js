const Router = require("express")
const router = new Router()

const userRouter = require('./User-router')
const generallDataRouter = require("./Generall-data-router")
const wordEncounteredRouter = require("./Word-encountered-router")
const bookDataRouter = require("./Book-data-router")
const bookFilesRouter = require("./book-files-router")
const dailyReportRouter= require("./daily-reports-router")
const wordInBoundRouter = require("./Word-in-bound-router")

router.use("/user", userRouter)
router.use("/generallData", generallDataRouter)
router.use("/wordEncountered", wordEncounteredRouter)
router.use("/bookData", bookDataRouter)
router.use("/bookFiles", bookFilesRouter)
router.use("/dailyReport", dailyReportRouter)
router.use("/wordInBound", wordInBoundRouter)

module.exports = router
