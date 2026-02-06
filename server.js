import http from 'http';
import app from './app.js';
import dotenv from 'dotenv';
import ConnectDb from './db/db.js';

dotenv.config();

const server = http.createServer(app);

const PORT = process.env.PORT || 8000;

const startServer = async () => {
  try {
    await ConnectDb();

    server.listen(PORT, () => {
      console.log(`🚀 Server running on Port http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
