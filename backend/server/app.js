import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { createHandler } from 'graphql-http/lib/use/express';
import {schema} from "./schema/schema.js";
import { connectMongo } from "../db.js";

const app = express();

dotenv.config();
app.use(cors());
connectMongo();

const Port = process.env.Port

app.all('/graphql', createHandler({schema}) );

app.listen(Port, ()=>{
    console.log(`Listening to port ${Port}`);
});