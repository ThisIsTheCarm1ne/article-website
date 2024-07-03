import mongoose from "mongoose";
import {
  Document,
  Schema as MongooseSchema,
  Types,
  Model
} from 'mongoose';
const Schema = mongoose.Schema;
import bcrypt from 'bcrypt';

export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  articles: Types.ObjectId[];
  matchPasswords: (password: string) => Promise<boolean>;
}

const userSchema: MongooseSchema<IUser> = new Schema(
  {
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
  },
  { timestamps: true }
);

userSchema.methods.matchPasswords = async function (enteredPassword: string | Buffer): Promise<boolean> {
  return bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt)
});

export default mongoose.model<IUser>('User', userSchema);
