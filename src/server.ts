import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';
import compression from 'compression';
import helmet from 'helmet';
import { ENV } from './config/env';
import { errorHandler } from './middleware/error-handler';
import connectDB from './config/db';

const app: Express = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan(ENV.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'An unexpected error occurred',
    error: ENV.NODE_ENV === 'production' ? {} : err,
  });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handling middleware
app.use(errorHandler);

// Start server
const port = ENV.PORT;
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  console.log(`⚡️[server]: Environment: ${ENV.NODE_ENV}`);
});

export default app;
