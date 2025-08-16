import model from "./model.js";

export const createComment = (userId, movieId, movieTitle, comment, rating) => model.create({user: userId, movieId, movieTitle, comment, rating});

export const findCommentsForMovie = (movieId) => model.find({movieId: movieId}).populate("user");

export const findCommentsForUser = (userId) => model.find({userId: userId});

export const deleteComment = (userId, commentId) => model.deleteOne({user: userId, _id: commentId});

export const updateComment = (commentId, comment, rating) => model.updateOne({_id: commentId}, {$set: {rating: rating, comment: comment}});