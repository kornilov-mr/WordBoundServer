const ApiError = require("../errors/ApiError")
const bcrypt = require("bcrypt")
const User = require("../database/models/user-model")
const Jwt = require('jsonwebtoken')
const fs = require('node:fs')
const UserDataCreator = require("../file-handlers/file-file-creator")

const {MongoClient} = require("mongodb")
const uri = "mongodb+srv://sweed:FL2IwbDCFnozYpw6@wordboundaccounts.uelk1rx.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);
const database = client.db("test");
const users = database.collection("users");
const generateJwt = (email,password) =>{
    return Jwt.sign({email, password},
        process.env.SECRET_KEY,
        {expiresIn: "336h"})
}
class UserController{
    async registration(req,res,next){
        const {email,password} = req.body
        if(!email|| !password){
            return next(ApiError.badRequest("email or password isn't provided"))
        }
        const query = {email:email}

        const candidate = await users.findOne({email:email},{})
        if(candidate){
            return next(ApiError.badRequest("email is already registered"))
        }

        UserDataCreator.createEmptyData(email)

        const hashPassword = await bcrypt.hash(password, 5)
        await users.insertOne({ email: email, password:password  },)

        const token = generateJwt(email,password)
        return res.json({token})
    }
    async login(req,res,next){
        console.log(req.body)
        const {email,password} = req.body
        if(!email|| !password){
            return next(ApiError.badRequest("email or password isn't provided"))
        }
        const query = {email:email}
        const candidate = await users.findOne(query)
        if(!candidate){
            return next(ApiError.InternalError("user with this email isn't found"))
        }
        if(candidate.password!==password){
            return next(ApiError.InternalError("wrong password"))
        }

        const token = generateJwt(email,password)
        return res.json({token})
    }
    async check(req,res,next){
        const {email,password} = req.user
        console.log(req.user)
        const query = {email:email,password:password}
        const candidate = await users.findOne(query)
        if(!candidate){
            return next(ApiError.InternalError("user isn't authorized"))
        }
        const token = generateJwt(email,password)
        return res.json({token})

    }
}
module.exports = new UserController()