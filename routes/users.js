// import { Router } from "express";
// import { verifyToken } from "../middlewares/verifyToken";
// import User from "../models/User";

// const userRouter = Router()

// //[USER]
// userRouter.put(":/id", verifyTokenAndAuthorizarion, async(req,res)=>{
//     if(req.body.password){
//         req.body.password = CryptoJS.AES.encrypt(password, AUTH_PASSWORD_SECRET);
//     }
//     const updatedUser = await User.findByIdAndUpdate(req.params.id, {
//         $set : req.body
//     }) 
// })


// export default userRouter