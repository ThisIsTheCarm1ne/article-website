import mongoose from "mongoose";
const Schema = mongoose.Schema;
// Article schema definition
const articleSchema = new Schema({
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
}, { timestamps: true });
export default mongoose.model('Article', articleSchema);
//# sourceMappingURL=articleSchema.js.map