import mongoose from "mongoose";

// set rule
const movieSchema = new mongoose.Schema({
  name: String,
  releaseYear: Date,
  actorName: String,
});

// create table

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
