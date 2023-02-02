import mongoose from "mongoose";
import { user } from "../../types";
import User from "../../models/User";

export const newUser = async (Body: user) => {
  if (!Body.Email || !Body.Name || !Body.LastName || !Body.Password)
    throw Error("Info Missing");
  if (Body.Email) {
    const userExist = await User.findOne({ Email: Body.Email });
    if (userExist) {
      throw Error("User already exist");
    }
  }
  let newUsers = await User.create({ ...Body });
  return newUsers;
};

export const getUser = async (id: String) => {
  if (!id) throw Error("info missing");
  const userFind = await User.findOne({ _id: id });
  if (!userFind) throw Error("User with that id not exist");
  return userFind;
};

export const getAllUsers = async () => {
  const users = await User.find();
  return users;
};