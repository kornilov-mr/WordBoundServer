const ApiError= require("../errors/ApiError")
const path = require('path')
const fs = require("fs")
class DailyReportsController {
    async post(req,res,next){
        const {email} = req.user
        const {PostRequests} = req.body

        const jsonPath = path.resolve(__dirname,"..","usersData",email,"statisticsInfo","dailyReports.json")
        await fs.readFile(jsonPath, "utf8", (err, jsonString) => {
            if (err) {
                return next(ApiError.InternalError("error with reading user's json file"))
            }
            let wordEncounteredJS = JSON.parse(jsonString);
            PostRequests.forEach((Report) =>{
                console.log(Report)
                const dtfTime =Object.keys(Report)[0];
                console.log(dtfTime)
                if(!wordEncounteredJS[dtfTime]){
                    wordEncounteredJS[dtfTime] = Report[dtfTime]
                }else{

                }
            })
            fs.writeFileSync(jsonPath, JSON.stringify(wordEncounteredJS))
            console.log(req.body)
            return res.json()
        });
    }
    async get(req,res,next){
        const {email} = req.user
        const jsonPath = path.resolve(__dirname,"..","usersData",email,"statisticsInfo","dailyReports.json")
        await fs.readFile(jsonPath, "utf8", (err, jsonString) => {
            if (err) {
                return next(ApiError.InternalError("error with reading user's json file"))
            }
            return res.json(JSON.parse(jsonString))

        });
    }
}
module.exports = new DailyReportsController()