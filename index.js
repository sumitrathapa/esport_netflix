import express from "express";
import connectDB from "./connect.db.js";
import Movie from "./movie.model.js";
import mongoose from "mongoose";

const app = express();

// to make app understand json
app.use(express.json());

//######################database connection##########
connectDB();

//######################routes######################
//add movie
app.post("/movie/add", async (req, res) => {
  const newMovie = req.body;
  await Movie.create(newMovie);
  return res.status(201).send({ message: "Movie is added successfully." });
});

//get movie list
app.get("/movie/list", async (req, res) => {
  const movieList = await Movie.find();

  return res.status(200).send({ message: "success", movies: movieList });
});

// get movie details by id
app.get("/movie/details/:id", async (req, res) => {
  // extract movie id from req.params
  const movieId = req.params.id;

  // validate for mongo id
  const isValidMongoId = mongoose.isValidObjectId(movieId);

  //if not valid mongo id
  if (!isValidMongoId) {
    return res.status(400).send({ message: "Invalid mongo id." });
  }

  //find movie by id
  const requiredMovie = await Movie.findOne({ _id: movieId });

  //if not movie, throw error
  if (!requiredMovie) {
    return res.status(404).send({ message: "Movie does not exit" });
  }
  //send res
  return res
    .status(200)
    .send({ message: "success", movieDetails: requiredMovie });
});

//?delete a course by id
app.delete("/movie/delete/:id", async (req, res) => {
  //extract movie id from req.params
  const movieId = req.params.id;

  //check for mongo id validity
  const isValidMongoId = mongoose.isValidObjectId(movieId);

  //if not valid mongo id, throw error
  if (!isValidMongoId) {
    return res.status(404).send({ message: "Invalid mongo id." });
  }

  //find movie by id
  const requiredMovie = await Movie.findOne({ _id: movieId });

  // if not movie,throw error
  if (!requiredMovie) {
    return res.status(404).send({ message: "Movie does not exist" });
  }

  // delete movie
  await Movie.deleteOne({ _id: movieId });

  // send response
  return res.status(200).send({ message: "Movie is deleted successfully" });
});

//? edit movie
app.put("/movie/edit/:id", async (req, res) => {
  //extract movie id from req.params
  const movieId = req.params.id;

  //check for mongo id validity
  const isValidMongoId = mongoose.isValidObjectId(movieId);

  // if not valid mongo id, throw error
  if (!isValidMongoId) {
    return res.status(400).send({ message: "Invalid mongo id" });
  }
  //find movie by id
  const requiredMovie = await Movie.findOne({ _id: movieId });

  // if not movie ,throw error
  if (!requiredMovie) {
    return res.status(400).send({ message: "Movie does not exsit" });
  }
  //get new values from req.body
  const newValues = req.body;

  // edit movie
  await Movie.updateOne(
    { _id: movieId },
    {
      $set: {
        name: newValues.name,
        releaseYear: newValues.releaseYear,
        actorName: newValues.actorName,
      },
    }
  );
  //send response
  return res.status(200).send({ message: "Movie is updated successfully" });
});
//#######################port and server#############

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
