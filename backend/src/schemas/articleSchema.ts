import mongoose from "mongoose";
import {
  Document,
  Schema as MongooseSchema,
  Types,
  Model
} from 'mongoose';
const Schema = mongoose.Schema;

// Article interface
export interface IArticle extends Document {
  title: string;
  content: string;
  author: Types.ObjectId;
}

// Article schema definition
const articleSchema: MongooseSchema<IArticle> = new Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
    },
    content: {
      type: String,
      required: [true, "Please provide content"],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IArticle>('Article', articleSchema);
