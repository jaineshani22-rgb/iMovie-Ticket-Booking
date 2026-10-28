const mongoose = require('mongoose');
const net = require('net');

const checkMongoAvailable = (uri) => {
  return new Promise((resolve) => {
    try {
      if (!uri) return resolve(false);
      // For mongodb+srv or remote clusters (like MongoDB Atlas), resolve true directly
      if (uri.startsWith('mongodb+srv://') || (!uri.includes('localhost') && !uri.includes('127.0.0.1'))) {
        return resolve(true);
      }

      const url = new URL(uri.replace('mongodb://', 'http://'));
      const host = url.hostname;
      const port = parseInt(url.port || '27017', 10);

      if (host === 'localhost' || host === '127.0.0.1') {
        const socket = new net.Socket();
        socket.setTimeout(300);
        socket.once('connect', () => {
          socket.destroy();
          resolve(true);
        });
        socket.once('error', () => {
          socket.destroy();
          resolve(false);
        });
        socket.once('timeout', () => {
          socket.destroy();
          resolve(false);
        });
        socket.connect(port, host);
        return;
      }
      resolve(true);
    } catch {
      // In case of complex URL characters in remote cluster strings, resolve true to allow mongoose to connect
      resolve(true);
    }
  });
};

const connectDB = async () => {
  // If already connected or connecting, reuse existing connection (crucial for serverless cold-start efficiency)
  if (mongoose.connection && mongoose.connection.readyState >= 1) {
    return mongoose.connection;
  }

  mongoose.set('bufferCommands', false);

  const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
  if (!uri) {
    return null;
  }

  // Ensure both environment variables are set so legacy or new code works identically
  process.env.MONGO_URI = uri;
  process.env.MONGODB_URI = uri;

  const isAvailable = await checkMongoAvailable(uri);
  if (!isAvailable) {
    return null;
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 3000,
      connectTimeoutMS: 5000
    });
    console.log('[iMovies] MongoDB connected successfully');
    return conn;
  } catch (err) {
    console.warn('[iMovies] MongoDB offline, continuing with resilient in-memory store fallback:', err.message);
    return null;
  }
};

module.exports = connectDB;