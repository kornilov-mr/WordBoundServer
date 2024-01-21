const ApiError= require("../errors/ApiError")
const path = require('path')
const fs = require("fs")
class WordEncounteredController {
    async post(req,res,next){
        const {email} = req.user
        const {PostRequests} = req.body
        const jsonPath = path.resolve(__dirname,"..","usersData",email,"userInfo","wordsIncountered.json")
        let wordEncounteredJS
        await fs.readFile(jsonPath, "utf8", (err, jsonString) => {
            if (err) {
                return next(ApiError.InternalError("error with reading user's json file"))
            }
            wordEncounteredJS = JSON.parse(jsonString);
            wordEncounteredJS["bookCount"]+=Object.keys(PostRequests).length
            PostRequests.forEach((word) =>{
                wordEncounteredJS["wordsIncountered"].push(word)

            })
            fs.writeFileSync(jsonPath, JSON.stringify(wordEncounteredJS))
            return res.json({"message":"data was sent"})
        });
    }
    async get(req,res,next){
        const {email} = req.user
        const jsonPath = path.resolve(__dirname,"..","usersData",email,"userInfo","wordsIncountered.json")
        await fs.readFile(jsonPath, "utf8", (err, jsonString) => {
            if (err) {
                return next(ApiError.InternalError("error with reading user's json file"))
            }
            return res.json(JSON.parse(jsonString))

        });
    }
}
module.exports = new WordEncounteredController()