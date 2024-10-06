const express = require('express')
const router = express.Router()

const zod = require('zod')
const jwt = require('jsonwebtoken')

const {User} = require('./../db')
const {JWT_SECRET} = require('./../config')
const {authMiddleware} = require('./../middleware')


//Applying authentication before every end-points
router.use(authMiddleware)



//SignUp

const signupBody = zod.object({
    username : zod.string().email(),
    firstName : zod.string(),
    lastName: zod.string(),
    password : zod.string()
})

router.post("/signup", async (req, res) => {
    const success = signupBody.safeParse(req.body)

    if(!success){
        return res.status(411)
                    .json({
                        message : "Invalid Inputs"
                    })
    }

    //search whether this user already exists
    const existingUser = User.findOne({
        username : req.body.username
    })

    if(existingUser){
        return res.status(411)
                    .json({
                        message : "Credentials already taken"
                    })
    }

    //Create User
    const newUser = await User.create({
        username : req.body.username,
        password : req.body.password,
        firstName : req.body.firstName,
        lastName : req.body.lastName,
    })

    const userId = newUser._id;       //_id is the default auto-generated ID

    //create JWT token (Payload, JWT Secret Key, Options)
    const token = jwt.sign({
        userId
    }, 
    JWT_SECRET, { 
        expiresIn : "1h"
    })


    res.status(201)
            .json({
        message : "User created successfully",
        token : token
    })

})





//SignIn

const signinBody = zod.object({
    username : zod.string().email(),
    password : zod.string()
})

router.post("/signin", async (req, res) => {

    const success = signinBody.safeParse(req.body)

    if(!success){
        return res.status(411)
                    .json({
                        message : "Invalid Inputs"
                    })
    }

    //search for the user using username and password
    const searchedUser = await User.findOne({
        username : req.body.username,
        password : req.body.password
    })

    if(!searchedUser){
        res.status(411)
            .json({
                message : "Invalid Inputs"
            })
    }

    //if credentials are correct, give JWT token, and let the user continue surfing
    if(searchedUser){
        const token = jwt.sign({
            userId : searchedUser._id
        }, JWT_SECRET, {
            expiresIn : "1h"
        })
    }

    res.status(200)
        .json({
            message : "Logged-in successfully",
            token : token
        })

})



//UPDATE user

const updateBody = zod.object({
    password : zod.string().optional(),
    firstName : zod.string().optional(),
    lastName : zod.string().optional()
})

router.put("/update", async (req, res) => {
    
    const success = updateBody.safeParse(req.body)
    if(!suceess){
        res.status(411)
            .json({
                msg : "Invalid details entered"
            })
    }

    //Finding the user
    const userFromDB = await User.findOne({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        password : req.body.password
    })

    if(!userFromDB){
        res.status(403)
            .json({
                msg : "No data exists for the given user!!"
            })
    }


    //updating the user
    userFromDB._id = req.userId
    userFromDB.firstName = req.body.firstName
    userFromDB.lastName = req.body.lastName
    userFromDB.password = req.body.password


    //OR, Updating directly
    // await User.updateOne({
    //     _id : req.userId    //updated from authMiddleware
    //     },   
    //     req.body,
    //     {runValidators : true}
    // )

    res.status(200)
        .json({
            msg : "User updated successfully!!"
        })

})


module.exports = {
    router
}