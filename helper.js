import { client } from './index.js';

 async function getMoviesById(id) {
    return await client.db("bwd28").collection("movies").findOne({ id: id });
}
 async function updateMovies(id, data) {
    return await client.db("bwd28").collection("movies").updateOne({ id: id }, { $set: data });
}
 async function deleteMoviesById(id) {
    return await client.db("bwd28").collection("movies").deleteOne({ id: id });
}
 async function getMovies(filter) {
    return await client.db("bwd28").collection("movies").find(filter).toArray();
}
 async function createMovies(data) {
    return await client.db("bwd28").collection("movies").insertMany(data);
}
 export{
    getMoviesById,
    updateMovies,
    deleteMoviesById,
    getMovies,
    createMovies,
};