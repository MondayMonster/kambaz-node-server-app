import model from "./model.js";

export const userFollowsUser = (follower, following) =>
    model.create({ follower, following });

export const userUnfollowsUser = (follower, following) =>
    model.deleteOne({ follower, following });

export const findFollowersForUser = (following) =>
    model.find({ following }).populate("follower");

export const findFollowingOfUser = (follower) =>
    model.find({ follower }).populate("following");



