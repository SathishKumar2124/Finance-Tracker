import express from "express";
import validateToken from "../middlewares/AuthMiddleware.js"
import { allRecordById, postRecord , updateRecord , deleteRecord, getRecordById , getMonthTotal , getYearTotal} from "../controllers/recordController.js";

const recordRouter = express.Router();


recordRouter.get("/all-record/:userId",validateToken,allRecordById);
recordRouter.get("/record/:recordId",validateToken,getRecordById);
recordRouter.get("/month-total",validateToken,getMonthTotal)
recordRouter.get("/year-total",validateToken,getYearTotal)



recordRouter.post("/new-record",validateToken,postRecord);


recordRouter.put("/update-record/:recordId",validateToken,updateRecord);


recordRouter.delete("/delete-record/:recordId",validateToken,deleteRecord);




export default recordRouter;


