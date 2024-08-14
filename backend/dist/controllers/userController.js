import User from '../schemas/userSchema.js';
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
// Function that generates JWT token.
const genToken = (id) => {
    const tokenSecret = process.env.TOKEN_SECRET;
    if (!tokenSecret) {
        throw new Error('TOKEN_SECRET is not defined in environment variables.');
    }
    return jwt.sign({ id }, tokenSecret, { expiresIn: '60d' });
};
export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (user.matchPasswords(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            token: genToken(user._id.toString())
        });
    }
    else {
        res.status(401);
        throw new Error('Invalid email or password.');
    }
});
export const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error("We already have an account with that email address. ");
    }
    const user = await User.create({
        name,
        email,
        password,
    });
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: genToken(user._id.toString())
        });
    }
    else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});
export const getUsers = async (req, res, next) => {
    try {
        const result = await User.find();
        res
            .status(200)
            .setHeader('Content-Type', 'application/json')
            .json(result);
    }
    catch (err) {
        throw new Error(`Error retrieving users: ${err.message}`);
    }
};
export const deleteUsers = asyncHandler(async (req, res, next) => {
    try {
        await User.deleteMany({});
        res.status(200).json({
            success: true,
            msg: 'You just did something REALLY horrible (deleted all users)'
        });
    }
    catch (err) {
        throw new Error(`Error deleting users: ${err.message}`);
    }
});
export const getUser = asyncHandler(async (req, res, next) => {
    try {
        const result = await User.findById(req.params.id);
        if (!result) {
            res.status(404);
            throw new Error("User not found.");
        }
        res
            .status(200)
            .setHeader('Content-Type', 'application/json')
            .json(result);
    }
    catch (err) {
        throw new Error(`Error retrieving user: ${err.message}`);
    }
});
export const putUser = asyncHandler(async (req, res, next) => {
    try {
        const result = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!result) {
            res.status(404);
            throw new Error("User not found.");
        }
        res
            .status(200)
            .setHeader('Content-Type', 'application/json')
            .json(result);
    }
    catch (err) {
        throw new Error(`Error updating user: ${err.message}`);
    }
});
export const deleteUser = asyncHandler(async (req, res, next) => {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }
    await User.deleteOne({ _id: userId });
    res.json({ success: true, message: 'User deleted successfully' });
});
//# sourceMappingURL=userController.js.map