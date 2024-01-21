const path = require("path")
const fs = require("fs");
const ApiError = require("../errors/ApiError");
class BookFileCreator {
    static createEmptyData(email,bookName){
        const mainFilePath = path.resolve(__dirname,"..","usersData",email,"books",bookName)
        const bookContentPath = path.join(mainFilePath,bookName+".txt")
        const bookCoverPath = path.join(mainFilePath,"cover.jpg")
        try {
            fs.mkdirSync(mainFilePath);
        } catch (err) {
            fs.unlinkSync(bookContentPath);
            fs.unlinkSync(bookCoverPath);
        }
        // fs.appendFileSync(bookContentPath,"")
        // fs.appendFileSync(bookCoverPath,"")
    }
}
module.exports= BookFileCreator