import express from 'express'
import { loginUser,registerUser,adminLogin } from "../controllers/userController.js";

const userRouter = express.Router();//for get or post method
 userRouter.post('/register',registerUser);
 userRouter.post('/login',loginUser)
 userRouter.post('/admin',adminLogin)

 export default userRouter;
