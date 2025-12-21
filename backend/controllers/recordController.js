import recordModel from "../models/financeRecord.js";



const allRecordById = async(req,res) => {
    try {
        const userId = req.params.userId;
        const  records = await recordModel.find({userId : userId});
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
        const newRecord = req.body;
        const newRecordSave = await  recordModel.findByIdAndUpdate({_id : recordId,newRecord});

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




export { allRecordById , postRecord ,updateRecord , deleteRecord};