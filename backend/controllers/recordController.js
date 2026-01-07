import mongoose from "mongoose";
import recordModel from "../models/financeRecord.js";



const allRecordById = async(req,res) => {
    try {
        const userId = req.params.userId;
        const  records = await recordModel.find({userId : userId}).sort({date : -1}).limit(10);
        if(records.length == 0){
            return res.status(404).json({msg : "no record found" , success : true});
        }
        res.status(200).send(records);
    } catch (error) {
        return res.status(500).json({
            msg :   error.message || "something went wrong!!!",
            success : false
        });
    }
    
};

const postRecord = async(req,res) => {
    try {
        const newRecordBody = req.body;
        const newRecord =  new recordModel(newRecordBody);
        await newRecord.save();
        res.status(201).json({
            msg : "New Record Created",
            success : true
        });
        
    } catch (error) {
        return res.status(500).json({
            msg :   error.message || "something went wrong!!!",
            success : false
        });
    }
    
};


const updateRecord = async(req,res) => {
    try {
        const recordId = req.params.recordId;
        const {description , amount , category , payMethod} = req.body;
        const newRecordSave = await  recordModel.findByIdAndUpdate({_id : recordId},{
            $set : {
                description,
                amount,
                category,
                payMethod
            }
        });

        if(!newRecordSave) return res.status(404).json({ 
            msg :   "no record found!!!",
            success : false
        });

        
        res.status(201).json({
            msg : "Record Updated Succesfully!!!",
            success : true
        });
        
    } catch (error) {
        return res.status(500).json({
            msg :   error.message || "something went wrong!!!",
            success : false
        });
    }
};

const deleteRecord = async(req,res) => {
    try {
        const recordId = req.params.recordId;
        const deleteRecord = await recordModel.findByIdAndDelete({_id : recordId});

        if(!deleteRecord) return res.status(404).json({ 
            msg :   "no record found!!!",
            success : false
        });

        
        res.status(201).json({
            msg : "Record Deleted Succesfully!!!",
            success : true
        });
        
    } catch (error) {
        return res.status(500).json({
            msg :   error.message || "something went wrong!!!",
            success : false
        });
    }
};

const getRecordById = async(req,res) => {
    const id = req.params.recordId;
    try {
        const record = await recordModel.findOne({_id : id});
        if(!record){
            return res.status(404).json({msg : "no record found!!!" , success : false});
        };
        res.status(200).json(record)
    } catch (error) {
         return res.status(500).json({
            msg :   error.message || "something went wrong!!!",
            success : false
        });
    }
    

}

const startOfMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1,
    0,0,0,0
);

const endOfMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    0,
    23,59,59,999
);

const startOfYear = new Date(
    new Date().getFullYear(),
    0,
    1,
    0,0,0,0
);

const endOfYear = new Date(
    new Date().getFullYear(),
    11,
    31,
    23,59,59,999
);


const getMonthTotal = async(req,res) => {
    const userId = req.user._id;
   try {
     const result = await recordModel.aggregate([
        {
            $match : {
                userId : userId,
                date : {
                    $gte : startOfMonth,
                    $lte : endOfMonth
                }
            }
        },
        {
            $group : {
                _id : null,
                totalAmount : { 
                    $sum : "$amount"
                }
            }
        }
    ]);

    res.status(200).json({
        success : true,
        total : result[0]?.totalAmount || 0
    })

   } catch (error) {
    res.status(500).json({
        success : false,
        msg  : "unable to calculate data" 
    })
   }

 }

const getYearTotal = async(req,res) => {
    const userId = req.user._id;
   try {
     const result = await recordModel.aggregate([
        {
            $match : {
                userId : userId,
                date : {
                    $gte : startOfYear,
                    $lte : endOfYear
                }
            }
        },
        {
            $group : {
                _id : null,
                totalAmount : { 
                    $sum : "$amount"
                }
            }
        }
    ]);

    res.status(200).json({
        success : true,
        total : result[0]?.totalAmount || 0
    })

   } catch (error) {
    res.status(500).json({
        success : false,
        msg  : "unable to calculate data" 
    })
   }

 }

export { allRecordById , postRecord ,updateRecord , deleteRecord , getRecordById , getMonthTotal , getYearTotal};