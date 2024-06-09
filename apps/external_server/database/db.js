import mongoose from 'mongoose';

const DBConnection =  async() => {
    const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/external_server';
    
    try {
        await mongoose.connect(MONGO_URI, { useNewUrlParser: true });
        console.log('Database connected successfully');
    } catch (error) {
        console.log('Error while connecting with the database ', error.message);
    }
}

export default DBConnection;
