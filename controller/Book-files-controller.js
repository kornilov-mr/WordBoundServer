const ApiError= require("../errors/ApiError")
const BookFileCreator = require('../file-handlers/book-file-creator')
const path = require('path');
const fs = require('fs');
const bookFileCreator = require("../file-handlers/book-file-creator")
var busboy  = require('busboy');
class BookFilesController {
    async post(req,res,next){
        const {email} = req.user
        const {bookname} = req.headers
        await bookFileCreator.createEmptyData(email,bookname)

        const bb = busboy ({ headers : req.headers });

        bb.on('file', function(fieldname, file, info) {
            const { filename} = info;
            console.log(filename)

            const bookFolderPath = path.resolve(__dirname,"..","usersData",email,"books",bookname,filename)
            file.pipe(fs.createWriteStream(bookFolderPath));
        });



        bb.on('finish', function() {
            res.writeHead(200, { 'Response': 'Saved' });
            res.end("That's all folks!");
        });
        return req.pipe(bb);
    }
    async get(req,res,next){
        const {email} = req.user
        console.log(req.user)
        const {storagename}=req.headers;
        console.log(req.headers)
        const filePath = path.resolve(__dirname,"..","usersData",email,"books",storagename)
        res.writeHead(200, {
            "Content-Type": req.headers.contenttype,
        });
        fs.createReadStream(filePath).pipe(res);
        return res;
    }
}
module.exports = new BookFilesController()