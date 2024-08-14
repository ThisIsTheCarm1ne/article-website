import mongoose from 'mongoose';
// Function that connects application to MongoDB.
// Requires MONGO_URL in .env
const connectDB = async () => {
    const mongoURL = process.env.MONGO_URL;
    if (!mongoURL) {
        throw new Error('URL for MongoDB isn\'t defined in .env');
    }
    const conn = await mongoose.connect(mongoURL, {
    /*
    useNewUrlParser: true,
    useUnifiedTopology: true
    */
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
};
export default connectDB;
//# sourceMappingURL=database.js.map