// const express=require('express')-for common js
import dotenv from 'dotenv';
import express, { response } from 'express';
import { MongoClient } from 'mongodb';
import {moviesRouter} from "./route/movies.js"

dotenv.config();

console.log(process.env);

const App=express();

 const PORT=process.env.PORT
 App.use(express.json());



// const MONGO_URL="mongodb://localhost";
const MONGO_URL=process.env.MONGO_URL ;


// mongodb+srv://rakesh:<password>@cluster0.5ngvq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
async function createconnection(){
const  client= new MongoClient(MONGO_URL);
await client.connect();
console.log("MongoDb connected");
return client
}
export const client= await createconnection();
App.get("/",(request,response)=>{
    response.send("hello world Everyone !!!!!!!🥰😁")
});

App.use("/movies",moviesRouter)

App.listen(PORT,()=>console.log("APP startes",PORT));


