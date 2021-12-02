import express from 'express';
import {
    getMoviesById,
    updateMovies,
    deleteMoviesById,
    getMovies,
    createMovies,
} from '../helper.js';

const  router=express.Router();
router.get("/",async(request,response)=>{
    console.log(request.query);
    const filter=request.query;
    console.log(filter);
    if(filter.rating){
        filter.rating=parseInt(filter.rating);
    }

// get method //
const filtermovies= await getMovies(filter);
console.log(filtermovies);
   response.send(filtermovies);
});
// post method(create) to add data//
router.post("/",async(request,response)=>{
    const data=request.body;
    const result=await createMovies(data)
    response.send(result);
})

// get method by id//
router.get("/:id",async(request,response)=>{
    console.log(request.params);
    const{id}=request.params;
    const movie= await getMoviesById(id);
    // const movie=movies.find((mv)=>mv.id===id);
    console.log(movie);
    movie?response.send(movie):response.status(404).send({message:"page not found"});
});

// delete method//
router.delete("/:id",async(request,response)=>{
    console.log(request.params)
    const {id}=request.params;
    const result= await deleteMoviesById(id);
    result.deletedCount > 0
    ?response.send(result):
    response.status(404).send({message:"page is not found"});
})
// put method(update) //
router.put("/:id",async(request,response)=>{
    console.log(request.params);
    const{id}=request.params;
    const data=request.body;
    const result=await updateMovies(id, data);
    const movie= await getMoviesById(id);
    response.send(movie);
})
export  const moviesRouter=router;