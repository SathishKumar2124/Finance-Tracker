import mongoose from "mongoose";

const connectDb = () => {
   
    try {
        mongoose.connect("mongodb://127.0.0.1/finance-tracker")
        .then(console.log('sucesfully connected to database')); 
    } catch (error) {
        console.log('error connecting to database.!!!')
    }
}

export default connectDb; 