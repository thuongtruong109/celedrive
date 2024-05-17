import mongoose from 'mongoose';

const DBConnection =  async() => {
    const MONGO_URI = 'mongodb+srv://pattlactroi:pattlactroi@cluster0.0r02fd6.mongodb.net/celedrive';
    
    try {
        await mongoose.connect(MONGO_URI, { useNewUrlParser: true });
        console.log('Database connected successfully');
    } catch (error) {
        console.log('Error while connecting with the database ', error.message);
    }
}

export default DBConnection;
