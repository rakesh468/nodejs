// const express=require('express')-for common js
import dotenv from 'dotenv';
import express, { response } from 'express';
import { MongoClient } from 'mongodb';

dotenv.config();

console.log(process.env);

const App=express();

 const PORT=9000;
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
const client= await createconnection();
App.get("/",(request,response)=>{
    response.send("hello world !!!🥰😁")
});

App.get("/movies",async(request,response)=>{
    console.log(request.query);
    const filter=request.query;
    console.log(filter);
    if(filter.rating){
        filter.rating=parseInt(filter.rating);
    }

// get method //
const filtermovies= await GetMovies(filter);
console.log(filtermovies);
   response.send(filtermovies);
});
// post method(create) to add data//
App.post("/movies",async(request,response)=>{
    const data=request.body;
    const result=await CreateMovies(data)
    response.send(result);
})

// get method by id//
App.get("/movies/:id",async(request,response)=>{
    console.log(request.params);
    const{id}=request.params;
    const movie= await GetMoviesById(id);
    // const movie=movies.find((mv)=>mv.id===id);
    console.log(movie);
    movie?response.send(movie):response.status(404).send({message:"page not found"});
});

// delete method//
App.delete("/movies/:id",async(request,response)=>{
    console.log(request.params)
    const {id}=request.params;
    const result= await DeleteMoviesById(id);
    result.deletedCount > 0
    ?response.send(result):
    response.status(404).send({message:"page is not found"});
})
// put method(update) //
App.put("/movies/:id",async(request,response)=>{
    console.log(request.params);
    const{id}=request.params;
    const data=request.body;
    const result=await UpdateMovies(id, data);
    const movie= await GetMoviesById(id);
    response.send(movie);
})
App.listen(PORT,()=>console.log("APP startes",PORT));

async function GetMoviesById(id) {
    return await client.db("bwd28").collection("movies").findOne({ id: id });
}

async function UpdateMovies(id, data) {
    return await client.db("bwd28").collection("movies").updateOne({ id: id }, { $set: data });
}

async function DeleteMoviesById(id) {
    return await client.db("bwd28").collection("movies").deleteOne({ id: id });
}

async function GetMovies(filter) {
    return await client.db("bwd28").collection("movies").find(filter).toArray();
}

async function CreateMovies(data) {
    return await client.db("bwd28").collection("movies").insertMany(data);
}
