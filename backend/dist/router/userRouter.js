import express from 'express';
import { getUsers, deleteUsers, deleteUser, getUser, putUser, loginUser, registerUser } from '../controllers/userController.js';
const userRouter = express.Router();
userRouter.get('/', getUsers);
userRouter.delete('/', deleteUsers);
userRouter.get('/:id', getUser);
userRouter.put('/:id', putUser);
userRouter.delete('/:id', deleteUser);
userRouter.post('/login', loginUser);
userRouter.post('/register', registerUser);
export default userRouter;
//# sourceMappingURL=userRouter.js.map