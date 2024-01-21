const fs = require("fs");
const EventEmitter = require('node:events');
class WordInBoundHandler extends EventEmitter {
    constructor(filePath, wordInboundJson) {
        super()
        this.filePath=filePath
        this.wordInboundJson=wordInboundJson
        this.on("addWordRequest",this.emitAddWord)
        this.on("addDeckRequest",this.emitAddDeck)
        this.on("changeCardRequest",this.emitChangeCard)
        this.on("updataTimeRequest",this.emitUpdateTime)
        this.on("addBookRequest",this.emitAddBook)


    }
    addBook(bookName,realName){
        this.wordInboundJson["books"][bookName]={}
        this.wordInboundJson["books"][bookName]["realBookName"] = realName;
        this.wordInboundJson["books"][bookName]["default"]={}
    }
    addDeck(bookName,deckName){
        this.wordInboundJson["books"][bookName][deckName]={}
    }
    addWord(bookName,deckName,id,key,realTime,nextRepeat,deck,originalWord,time,wordTranslation,repeatCount){
        if(!this.wordInboundJson["books"][bookName][deckName]){
            this.wordInboundJson["books"][bookName][deckName]={}
        }
        if(this.wordInboundJson["books"][bookName][deckName][id]){
            this.wordInboundJson["books"][bookName][deckName][id][key]=this._createWordBound(realTime,nextRepeat,deck,originalWord,time,id,wordTranslation,repeatCount)
        }else{
            this.wordInboundJson["books"][bookName][deckName][id]={}
            this.wordInboundJson["books"][bookName][deckName][id][key]=this._createWordBound(realTime,nextRepeat,deck,originalWord,time,id,wordTranslation,repeatCount)
        }
    }
    changeCard(bookName,deckName,id,key,originalWord,wordTranslation){
        this.wordInboundJson["books"][bookName][deckName][id][key]["wordTranslation"]=originalWord;
        this.wordInboundJson["books"][bookName][deckName][id][key]["originalWord"]=wordTranslation;
    }
    updateTime(bookName,deckName,id,key,nextRepeat,repeatCount){
        this.wordInboundJson["books"][bookName][deckName][id][key]["nextrepeat"]=nextRepeat;
        this.wordInboundJson["books"][bookName][deckName][id][key]["repeatCount"]=repeatCount;
    }
    saveJson(){
        fs.writeFileSync(this.filePath, JSON.stringify(this.wordInboundJson))
    }
    _createWordBound(realTime,nextRepeat,deck,originalWord,time,id,wordTranslation,repeatCount){
        let wordData = {}
        wordData["realTime"]=realTime;
        wordData["nextrepeat"]=nextRepeat;
        wordData["deck"]=deck;
        wordData["originalWord"]=originalWord;
        wordData["time"]=time;
        wordData["id"]=id;
        wordData["wordTranslation"]=wordTranslation;
        wordData["repeatCount"]=repeatCount;
        console.log("repeatCount")
        console.log(repeatCount)
        return wordData
    }
    emitAddBook(params){
        this.addBook(params["bookName"],params["realName"])
    }
    emitAddDeck(params){
        this.addDeck(params["bookName"],params["deck"])
    }

    emitAddWord(params){
        const cardData= JSON.parse(params["cardData"])
        console.log(cardData)
        this.addWord(params["bookName"],params["deck"],params["id"],params["key"],
            cardData["realTime"],cardData["nextrepeat"],cardData["deck"],cardData["originalWord"],
            cardData["time"],cardData["wordTranslation"],cardData["repeatCount"])
    }

    emitChangeCard(params){
        const cardData= JSON.parse(params["cardData"])
        this.changeCard(params["bookName"],params["deck"],params["id"],params["key"],
            cardData["originalWord"],cardData["wordTranslation"])
    }
    emitUpdateTime(params){
        const cardData= JSON.parse(params["cardData"])
        this.updateTime(params["bookName"],params["deck"],params["id"],params["key"],
            cardData["nextrepeat"],cardData["repeatCount"])
    }
}
module.exports = WordInBoundHandler