import userSchema from "../dao/models/user.model.js";
import UserDao from "../dao/nomgoDb/user.dao.js";

const dao = new UserDao("user", userSchema);

const findByEmail = async (email) => {
  const user = await dao.findByEmail(email);
  return user;
};

export { findByEmail};
