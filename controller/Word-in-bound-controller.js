const ApiError= require("../errors/ApiError")
const path = require('path')
const WordInBoundHandler = require("../utilits/json/WordInBoundHandler")

const fs = require("fs")
class WordInBoundController {
    async post(req,res,next){
        const {email} = req.user
        console.log(req.user)
        const jsonPath = path.resolve(__dirname,"..","usersData",email,"userInfo","wordInBound.json")
        let wordInBound
        await fs.readFile(jsonPath, "utf8", (err, jsonString) => {
            if (err) {
                return next(ApiError.InternalError("error with reading user's json file"))
            }
            wordInBound = JSON.parse(jsonString);
            const wordInBoundHandler = new WordInBoundHandler(jsonPath,wordInBound)
            req.body.forEach((request) =>{
                console.log(request)
                wordInBoundHandler.emit(request["requestType"],request)
            })
            wordInBoundHandler.saveJson()
            return res.json({"message":"data was sent"})
        });
    }
    async get(req,res,next){
        const {email} = req.user
        const jsonPath = path.resolve(__dirname,"..","usersData",email,"userInfo","wordInBound.json")
        await fs.readFile(jsonPath, "utf8", (err, jsonString) => {
            if (err) {
                return next(ApiError.InternalError("error with reading user's json file"))
            }
            return res.json(JSON.parse(jsonString))
        });
    }
}
module.exports = new WordInBoundController()