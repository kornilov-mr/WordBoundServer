const ApiError= require("../errors/ApiError")
const path = require('path')
const fs = require("fs")
class BookDataController {
    async post(req,res,next){
        const {email} = req.user
        const jsonPath = path.resolve(__dirname,"..","usersData",email,"books","bookInfo.json")

        fs.writeFileSync(jsonPath, JSON.stringify(req.body))
        return res.json({"message":"data was sent"})
    }
    async get(req,res,next){
        const {email} = req.user
        const jsonPath = path.resolve(__dirname,"..","usersData",email,"books","bookInfo.json")
        await fs.readFile(jsonPath, "utf8", (err, jsonString) => {
            if (err) {
                return next(ApiError.InternalError("error with reading user's json file"))
            }
            return res.json(JSON.parse(jsonString))

        });
    }
}
module.exports = new BookDataController()