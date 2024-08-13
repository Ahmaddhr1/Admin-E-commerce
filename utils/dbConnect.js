import mongoose from 'mongoose';
require('dotenv').config();
const MONGODB_URI = process.env.MONGO_CONNECTION;

let isConnected = false;

export async function DbConnect() {
  if (isConnected) return;

  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error.message);
  }
}
