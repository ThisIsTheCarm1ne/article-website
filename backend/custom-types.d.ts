import { Document } from "mongoose";

declare module 'mongoose' {
  interface User extends Document {
    matchPasswords: (enteredPassword: string | Buffer) => Promise<boolean>;
  }
}
