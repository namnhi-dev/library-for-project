import express from "express";
const routes = express.Router();
import {
    createUser,
    getUser,
    loginUser,
} from "../controllers/userController.js";

/**
 *  [POST] /
 */
routes.post("/", createUser);
routes.post("/login", loginUser);
routes.get("/", getUser);

export default routes;
