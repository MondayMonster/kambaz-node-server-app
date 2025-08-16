import model from './model.js';

export const findAllUsers = () => model.find();
export const findUserById = (userId) => model.findById(userId);
export const findUserByUsername = (username) =>
  model.findOne({ username: username });
export const findUserbyCredentials = (username, password) => 
  model.findOne({ username, password });
export const createUser = (user) => model.create(user);
export const updateUser = (id, user) => model.updateOne({ _id: id }, { $set: user });
export const deleteUser = (id) => model.deleteOne({ _id: id });
export const deleteAllUsers = () => {};
