const ApiError= require("../errors/ApiError")
const path = require('path')
const fs = require("fs")
class GenerallDataController{
    async post(req,res){
        const {email} = req.user
        console.log(req.body)
        const jsonPath = path.resolve(__dirname,"..","usersData",email,"userInfo","userGenerallData.json")

        fs.writeFileSync(jsonPath, JSON.stringify(req.body))
        console.log(req.body)
        return res.json({"message":"data was sent"})
    }
    async get(req,res,next){
        const {email} = req.user
        const jsonPath = path.resolve(__dirname,"..","usersData",email,"userInfo","userGenerallData.json")
        let JsonString;
        await fs.readFile(jsonPath, "utf8", (err, jsonString) => {
            if (err) {
                return next(ApiError.InternalError("error with reading user's json file"))
            }
            return res.json(JSON.parse(jsonString))
        });
    }
}
module.exports = new GenerallDataController()