import dotenv from 'dotenv';
dotenv.config({ path: './config/config.env' });
import express from 'express';

import connectDB from './config/database.js';
import userRouter from './router/userRouter.js';
import articleRouter from './router/articleRouter.js';

dotenv.config();

const app = express();

// Connect to database
connectDB();

app.use(express.json());

const PORT = process.env.PORT || 5001;

// Use routes
app.use('/users', userRouter);
app.use('/articles', articleRouter);

const server = app.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}`);
});

function isError(err: unknown): err is Error {
  return err instanceof Error;
}

process.on('unhandledRejection', (err) => {
  if (isError(err)) {
    console.log(`Error: ${err.message}`);
  } else {
    console.log('Unknown error:', err);
  }
  server.close(() => process.exit(1));
});

// For testing purposes
export default app;
