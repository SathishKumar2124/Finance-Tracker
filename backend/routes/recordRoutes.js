import express from "express";
import validateToken from "../middlewares/AuthMiddleware.js"
import { allRecordById, postRecord , updateRecord , deleteRecord} from "../controllers/recordController.js";

const recordRouter = express.Router();

recordRouter.get("/all-record/:userId",validateToken,allRecordById);
recordRouter.post("/new-record",validateToken,postRecord);
recordRouter.put("/update-record/:recordId",validateToken,updateRecord);
recordRouter.post("/delete-record/:recordId",validateToken,deleteRecord);



export default recordRouter;


