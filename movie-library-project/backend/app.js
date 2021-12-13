const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Movie = require("./models/movie");

const app = express();

mongoose
  .connect("mongodb://localhost:27017/movie-library")
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/movies", (req, res, next) => {
  const movie = new Movie({
    id: req.body.id,
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
  });
  console.log(movie);
  movie.save().then((createdMovie) => {
    res.status(201).json({
      message: "Movie added successfully",
      movie: createdMovie,
    });
  });
});

app.put("/api/movies/:id", (req, res, next) => {
  Movie.findOne({ id: req.params.id })
    .then((movie) => {
      movie.title = req.body.title;
      movie.description = req.body.description;
      movie.imageUrl = req.body.imageUrl;

      Movie.updateOne({ id: req.params.id }, movie)
        .then((result) => {
          res.status(204).json({
            message: "Movie updated successfully",
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "An error occurred",
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Movie not found.",
        error: { movie: "Movie not found" },
      });
    });
});

app.get("/api/movies", (req, res, next) => {
  Movie.find().then((movies) => {
    res.status(200).json(movies);
  });
});

app.delete("/api/movies/:id", (req, res, next) => {
  Movie.deleteOne({ id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({ message: "Movie deleted!" });
  });
});

module.exports = app;
