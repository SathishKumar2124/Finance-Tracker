import mongoose from "mongoose";

// userId : userId,
//       date : new Date(),
//       description,
//       amount,
//       category,
//       payMethod

const recordSchema = new mongoose.Schema({
    userId : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    amount : {
        type : Number,
        required : true
    },
    category : {
        type : String,
        required : true
    },
    payMethod : {
        type : String,
        required : true
    }
});

const recordModel = mongoose.model("Record",recordSchema);

export default recordModel;
