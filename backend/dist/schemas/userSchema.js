import mongoose from "mongoose";
const Schema = mongoose.Schema;
import bcrypt from 'bcrypt';
const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Please provide an email address"],
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
    articles: [{
            type: Schema.Types.ObjectId,
            ref: 'Article',
        }],
}, { timestamps: true });
userSchema.methods.matchPasswords = async function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
};
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});
export default mongoose.model('User', userSchema);
//# sourceMappingURL=userSchema.js.map