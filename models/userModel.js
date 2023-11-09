const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    username: {type:String},
    email: {type:String},
    password: {type:String},  
})
// {
//     "username" : "abc",
//     "email":"Shubham@123"
//     "password": "123"
// }

const UserModel=mongoose.model("user",userSchema)

module.exports={
    UserModel
}