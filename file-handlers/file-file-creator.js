const path = require("path")
const fs = require("fs");
const ApiError = require("../errors/ApiError");
class FileFileCreator {
    static createEmptyData(email){
        const mainFilePath = path.resolve(__dirname,"..","usersData",email)
        const bookFilePath = path.join(mainFilePath,"books")
        const statisticsInfoFilePath = path.join(mainFilePath,"statisticsInfo")
        const userInfoFilePath = path.join(mainFilePath,"userInfo")

        try {
            fs.mkdirSync(mainFilePath);
            fs.mkdirSync(bookFilePath);
            fs.mkdirSync(statisticsInfoFilePath);
            fs.mkdirSync(userInfoFilePath);

        } catch (err) {
            throw err
        }

        fs.appendFileSync(path.join(bookFilePath,"bookInfo.json"),"")
        fs.appendFileSync(path.join(statisticsInfoFilePath,"dailyReports.json"),"{}")
        fs.appendFileSync(path.join(userInfoFilePath,"userGenerallData.json"),"{}")
        fs.appendFileSync(path.join(userInfoFilePath,"wordsIncountered.json"),"{\"bookCount\":0,\"wordsIncountered\":[]}")
        fs.appendFileSync(path.join(userInfoFilePath,"wordInBound.json"),"{\"books\":{}}")
    }
}
module.exports= FileFileCreator