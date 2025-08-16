import model from "./model.js";

export const findAllLikes = () => model.find();

export const CreateUserLike = (userId, movieId, movieTitle) => model.create({user: userId, movieId: movieId, movieTitle: movieTitle});

export const deleteUserLike = (userId, movieId) => model.deleteOne({ user: userId, movieId: movieId });

export const findUsersLikeMovies = (movieId) => model.find({ movieId: movieId }).populate("user");

export const findMoviesLikedByUser = (userId) => model.find({ user: userId });