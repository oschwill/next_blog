import mongoose from 'mongoose';

const connection = {};

export const connectToDb = async () => {
  try {
    if (connection.isConnected) {
      console.log('db is connected');
      return;
    }
    const db = await mongoose.connect(process.env.MONGO_DB);

    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    console.log(error);
  }
};
