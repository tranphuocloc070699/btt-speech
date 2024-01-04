import { Router } from "express";
import { Get_Code_API,Verify_Code_API } from "../controllers/multiFa.controller.js";


const multiFaRouter = Router();
multiFaRouter.get(`/`, Get_Code_API);
multiFaRouter.post(`/`, Verify_Code_API);


export default multiFaRouter;