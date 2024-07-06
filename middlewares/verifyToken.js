import jwt from "jsonwebtoken";
import { messages } from "../constants";
const { JWT_SECRET } = process.env
export const verifyToken = (req, res, next) => {
    const authToken = req.headers.token;
    if (authHeader) {
        jwt.verify(authToken, JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ status: false, message: messages.INVALID_TOKEN })
            } else {
                req.user = user
                next()
            }
        })
    } else {
        return res.status(401).json({ message: messages.NOT_AUTHORIZED, status: false })
    }
}

export const verifyTokenAndAuthorizarion = (req,res,next)=>{
  
        verifyToken(req,res,()=>{
            if(req.user.id=== req.params.id || req.user.isAdmin){
                next()
            }
            else{
                res.status(403).json({status:false, messages:messages.NOT_AUTHORIZED})
            }
        })
    
}